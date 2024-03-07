import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { UsuarioSinSession } from '@/lib/Errors'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { ErroresTiposGastos } from '@/lib/Errors/TiposGastos/ErroresTiposGastos'
import { RutasAPI, UrlApi } from '@/lib/Globales'

export interface TiposGastosFront {
	id: number
	nombre: string
	descrip: any
	imagen: string
}

export default async function TiposGastosService(
	otros: boolean = false,
): Promise<Either<ErroresTiposGastos, TiposGastosFront[]>> {
	let either = new Either<ErroresTiposGastos, TiposGastosFront[]>()
	let params = '?'
	if (otros) params += 'otros=true'
	const url = UrlApi + RutasAPI.tipos.gastos + params

	try {
		const respuesta = await fetch(url)
		const { status } = respuesta
		const json = await respuesta.json()

		if (status !== 200) {
			const error = MatchError(status, json)
			either.setError(error)
			return either
		}

		const listado: TiposGastosFront[] = json
		either.setRight(listado)
	} catch (error) {
		if (ErrorConexionServidor(error)) {
			either.setError(new ServicioNoDisponible({}))
		} else either.setError(new ServerError({}))
	} finally {
		return either
	}
}

type CodigosHttpError = 403 | 503

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresTiposGastos {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}
