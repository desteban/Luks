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

interface props {
	pagina: number
	resultados?: number
	abortSignal?: AbortSignal
}

export interface PaginacionListadoIngresos {
	pagina: number
	porPagina: number
	totalPaginas: number
	total: number
	ingresos: IngresosUsuario[]
}

function Params(pagina: number, resultados?: number): string {
	let params = '?'

	if (pagina) params += `&pagina=${pagina}`
	if (resultados) params += `&porPagina=${resultados}`

	return params === '?' ? '' : params
}

type CodigosHttpError = 403 | 404 | 503

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresIngreso {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		404: new GastoNoEncontrado(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}

export default async function ListadoIngresosService({
	pagina,
	abortSignal,
	resultados,
}: props): Promise<Either<ErroresIngreso | ServicioNoDisponible, PaginacionListadoIngresos>> {
	let either = new Either<ErroresIngreso | ServicioNoDisponible, PaginacionListadoIngresos>()
	const params = Params(pagina, resultados)

	try {
		const respuesta = await fetch(UrlApi + RutasAPI.ingresos + params, { signal: abortSignal })
		const json = await respuesta.json()
		const { status } = respuesta

		if (status !== 200) {
			const error = MatchError(status, json)
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
