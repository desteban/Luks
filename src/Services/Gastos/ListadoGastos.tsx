import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import { Either } from '@/lib/Either'
import { ErrorParseSchema, UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { CrearActualizarGastoError } from '@/lib/Errors/Gastos/CrearActualizarGastoError'
import { GastoNoEncontrado } from '@/lib/Errors/Gastos/GastoNoEncontrado'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ErroresPrisma } from '@/lib/Errors/Prisma/ErroresPrisma'
import { ServerError } from '@/lib/Errors/ServerError'
import { ErroresTiposGastos } from '@/lib/Errors/TiposGastos/ErroresTiposGastos'
import { RutasAPI, UrlApi } from '@/lib/Globales'

interface props {
	pagina: number
	resultados?: number
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

	const respuesta = await fetch(`${UrlApi}${RutasAPI.gastos}${params}`)
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
