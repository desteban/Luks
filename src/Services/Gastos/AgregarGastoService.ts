import { Either } from '@/lib/Either'
import { ErrorParseSchema, UsuarioSinSession } from '@/lib/Errors'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { RutasAPI, UrlApi } from '@/lib/Globales'

interface props {
	nombre: string | null
	valor: number
	tipo: number
}

export default async function AgregarGastoService(
	props: props,
): Promise<Either<GastosTipoError | ServicioNoDisponible, boolean>> {
	let either = new Either<GastosTipoError | ServicioNoDisponible, boolean>()

	try {
		const respuesta = await fetch(UrlApi + RutasAPI.gastos, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(props),
		})
		const { status } = respuesta
		const json = await respuesta.json()

		if (status !== 201) {
			const error = MatchError(status, json)
			either.setError(error)
			return either
		}

		either.setRight(true)
	} catch (error) {
		if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
			console.error('Error de red: no se pudo conectar al servidor.')
			either.setError(new ServicioNoDisponible({}))
		} else either.setError(new ServerError({}))
	} finally {
		return either
	}
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
