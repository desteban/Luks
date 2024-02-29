import { UrlApi } from '@/lib/Globales'
import { User } from '@prisma/client'

export interface RootListadoUsuarios {
	usuarios: User[]
	pagina: number
	porPagina: number
	totalPaginas: number
}

export default async function ListadoUsuarios(): Promise<RootListadoUsuarios> {
	const respuesta = await fetch(`${UrlApi}usuarios`)
	const json: RootListadoUsuarios = await respuesta.json()
	return json
}
