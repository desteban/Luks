import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { UsuarioSinSession } from '@/lib/Errors'
import { GastoNoEncontrado } from '@/lib/Errors/Gastos/GastoNoEncontrado'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { RutasAPI, UrlApi } from '@/lib/Globales'

type CodigosHttpError = 403 | 503 | 404

function MatchError(status: number, json: { mensaje: string; data: string[] }): GastosTipoError {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		404: new GastoNoEncontrado(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export async function ObtenerGasto(gastoId: string): Promise<Either<GastosTipoError, GastoUsuario>> {
	let either = new Either<GastosTipoError, GastoUsuario>()

	try {
		const response = await fetch(UrlApi + RutasAPI.gastos + '/' + gastoId)
		const json = await response.json()

		if (response.status !== 200) {
			const error = MatchError(response.status, json)
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
