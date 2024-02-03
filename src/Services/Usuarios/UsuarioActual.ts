import { UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { RutasAPI, UrlApi } from '@/lib/Globales'

export interface UsuarioActual {
	name: string
	lastName: any | null
	email: string
	// correoGoogle: string | null
	// nombreUsuario: string | null
}

export default async function UsuarioActualPeticion(): Promise<UsuarioActual | ErroresUsuarios> {
	const respuesta = await fetch(`${UrlApi}${RutasAPI.UsuarioActual}`)

	if (respuesta.status === 403) {
		return new UsuarioSinSession({})
	}

	if (respuesta.status === 404) {
		return new UserNotFound({})
	}

	const json = (await respuesta.json()) as UsuarioActual
	return json
}
