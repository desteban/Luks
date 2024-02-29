import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { UsuarioSinSession } from '@/lib/Errors'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { ErroresTiposIngresos } from '@/lib/Errors/TiposIngresos/ErroresTipoIngresos'
import { RutasAPI, UrlApi } from '@/lib/Globales'

export interface TiposIngresosFront {
	id: number
	nombre: string
	descrip: any
	imagen: string
}

type CodigosHttpError = 403 | 503

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresTiposIngresos {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export default async function TiposIngresosService(): Promise<Either<ErroresTiposIngresos, TiposIngresosFront[]>> {
	let either = new Either<ErroresTiposIngresos, TiposIngresosFront[]>()

	try {
		const respuesta = await fetch(UrlApi + RutasAPI.tipos.ingresos)
		const json = await respuesta.json()

		if (respuesta.status !== 200) {
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
