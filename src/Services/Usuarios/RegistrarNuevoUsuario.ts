import { CrearUsuarioTipo } from '@/Modules/Usuarios/Schemas/CrearUsuario.Schema'
import { Either } from '@/lib/Either'
import { ErrorParseSchema, UserDuplicated, UsuarioSinSession } from '@/lib/Errors'
import { ServerError } from '@/lib/Errors/ServerError'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { RutasAPI, UrlApi } from '@/lib/Globales'

export default async function RegistrarNuevoUsuario(
	usuarioNuevo: CrearUsuarioTipo,
): Promise<Either<ErroresUsuarios, boolean>> {
	let either = new Either<ErroresUsuarios, boolean>()
	let respuesta = await fetch(`${UrlApi}${RutasAPI.usuarios}`, { method: 'POST', body: JSON.stringify(usuarioNuevo) })
	const json = await respuesta.json()

	if (respuesta.status !== 201) {
		either.setError(MatchError(respuesta.status, json))
		return either
	}

	either.Right()
	return either
}

type CodigosHttpError = 400 | 409 | 500
function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresUsuarios {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		400: new ErrorParseSchema(datos),
		409: new UserDuplicated(datos),
		500: new ServerError(datos),
	}

	return errores[status as CodigosHttpError] ?? new ServerError({})
}
