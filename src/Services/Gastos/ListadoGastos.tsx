import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import { Either } from '@/lib/Either'
import { ErrorParseSchema, UsuarioSinSession } from '@/lib/Errors'
import { GastoNoEncontrado } from '@/lib/Errors/Gastos/GastoNoEncontrado'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { RutasAPI, UrlApi } from '@/lib/Globales'

interface props {
	pagina: number
	resultados?: number
	abortSignal?: AbortSignal
}

interface PaginacionListadoGastos {
	pagina: number
	porPagina: number
	totalPaginas: number
	total: number
	gastos: GastoUsuario[]
}

function ObtenerParams({ pagina, resultados }: props): string {
	let params = '?'

	if (pagina) params += `&pagina=${pagina}`
	if (resultados) params += `&porPagina=${resultados}`

	return params
}

export default async function ListadoGastos(data: props): Promise<Either<GastosTipoError, PaginacionListadoGastos>> {
	let either = new Either<GastosTipoError, PaginacionListadoGastos>()
	const params = ObtenerParams(data)

	const respuesta = await fetch(`${UrlApi}${RutasAPI.gastos}${params}`, { signal: data.abortSignal })
	const json = await respuesta.json()

	if (respuesta.status !== 200) {
		const error = MatchError(respuesta.status, json)
		either.setError(error)
		return either
	}

	either.setRight(json as PaginacionListadoGastos)
	return either
}

type CodigosHttpError = 403 | 404 | 503

function MatchError(status: number, json: { mensaje: string; data: string[] }): GastosTipoError {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		403: new UsuarioSinSession(datos),
		404: new GastoNoEncontrado(datos),
		400: new ErrorParseSchema(datos),
		503: new ConexionDbError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}
