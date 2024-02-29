import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { ErrorParseSchema, UsuarioSinSession } from '@/lib/Errors'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { ErroresTiposIngresos } from '@/lib/Errors/TiposIngresos/ErroresTipoIngresos'
import { RutasAPI, UrlApi } from '@/lib/Globales'

interface props {
	nombre?: string | null
	valor: number
	tipo: number
}

type CodigosHttpError = 403 | 503 | 400

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresTiposIngresos {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		503: new ConexionDbError(datos),
		400: new ErrorParseSchema(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export default async function AgregarIngresoService(
	props: props,
): Promise<Either<ErroresTiposIngresos | ServicioNoDisponible, boolean>> {
	let either = new Either<ErroresTiposIngresos | ServicioNoDisponible, boolean>()

	try {
		const respuesta = await fetch(UrlApi + RutasAPI.ingresos, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(props),
		})
		const json = await respuesta.json()

		if (respuesta.status !== 201) {
			const error = MatchError(respuesta.status, json)
			either.setError(error)
			return either
		}

		either.setRight(json)
	} catch (error) {
		if (ErrorConexionServidor(error)) {
			either.setError(new ServicioNoDisponible({}))
		} else either.setError(new ServerError({}))
	}

	return either
}
