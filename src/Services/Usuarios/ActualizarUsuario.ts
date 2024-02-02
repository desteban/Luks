import { RutasAPI, UrlApi } from '@/lib/Globales'
import { UsuarioActual } from './UsuarioActual'
import { Either } from '@/lib/Either'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { ErrorParseSchema, UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { ActualizarUsuarioError } from '@/lib/Errors/Usuarios/ActualizarUsuarioError'
import { ServerError } from '@/lib/Errors/ServerError'

interface props {
	usuario: UsuarioActual
}

export type UsuarioActualizado = {
	mensaje: string
	usuario: Usuario
}

type Usuario = {
	nombre: string
	apellido: any
	correo: string
	nombreUsuario: string
	correoGoogle: string
}

export type ErrorActuaizar = {
	mensaje: string
	data: string[]
}

export default async function ActualizarUsuarioPeticion({
	usuario,
}: props): Promise<Either<ErroresUsuarios, UsuarioActualizado>> {
	const either = new Either<ErroresUsuarios, UsuarioActualizado>()
	const respuesta = await fetch(`${UrlApi}${RutasAPI.usuarios}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(usuario),
	})

	const json = await respuesta.json()
	const { status } = respuesta

	if (status !== 200) {
		either.setError(MatchError(status, json))
		return either
	}

	either.setRight(json as UsuarioActualizado)
	return either
}

type CodigosHttp = 400 | 403 | 404 | 409

function MatchError(status: number, json: { mensaje: string; data: string[] }): ErroresUsuarios {
	const datos = { mensaje: json.mensaje, contenido: json.data }
	const errores = {
		400: new ErrorParseSchema(datos),
		403: new UsuarioSinSession(datos),
		404: new UserNotFound(datos),
		409: new ActualizarUsuarioError(datos),
	}

	return errores[status as CodigosHttp] ?? new ServerError({})
}
