import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { ErrorParseSchema, UsuarioSinSession } from '@/lib/Errors'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { RutasAPI, UrlApi } from '@/lib/Globales'

interface props {
	id: string
	valor: number
	tipo: number
	nombre?: string | null
}

type CodigosHttpError = 403 | 400 | 503

function MatchError(status: number, json: { mensaje: string; data: string[] }): GastosTipoError {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		400: new ErrorParseSchema(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export default async function EditarGasto(
	props: props,
): Promise<Either<GastosTipoError | ServicioNoDisponible, boolean>> {
	let either = new Either<GastosTipoError | ServicioNoDisponible, boolean>()

	try {
		const respuesta = await fetch(UrlApi + RutasAPI.gastos + '/' + props.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(props),
		})

		const json = await respuesta.json()

		if (respuesta.status !== 200) {
			either.setError(MatchError(respuesta.status, json))
			return either
		}

		either.setRight(true)
	} catch (error) {
		if (ErrorConexionServidor(error)) {
			either.setError(new ServicioNoDisponible({}))
		} else either.setError(new ServerError({}))
	}

	return either
}
