import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { IngresosUsuario } from '@/Modules/Ingresos/Services/IngresosUsuario'
import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { UsuarioSinSession } from '@/lib/Errors'
import { GastoNoEncontrado } from '@/lib/Errors/Gastos/GastoNoEncontrado'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { RutasAPI, UrlApi } from '@/lib/Globales'

type CodigosHttpError = 403 | 503 | 404

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresIngreso {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		404: new GastoNoEncontrado(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export default async function ObtenerIngreso(
	ingresoId: string,
): Promise<Either<ErroresIngreso | ServicioNoDisponible, IngresosUsuario>> {
	let either = new Either<ErroresIngreso | ServicioNoDisponible, IngresosUsuario>()

	try {
		const url = UrlApi + RutasAPI.ingresos + '/' + ingresoId
		const respuesta = await fetch(url)
		const json = await respuesta.json()

		if (!respuesta.ok) {
			either.setError(MatchError(respuesta.status, json))
			return either
		}

		either.setRight(json)
	} catch (error) {
		if (ErrorConexionServidor(error)) {
			either.setError(new ServicioNoDisponible({}))
		} else {
			either.setError(new ServerError({}))
		}
	}

	return either
}
