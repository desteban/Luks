import { Prisma, User } from '@prisma/client'
import { prisma } from '@/lib/Prisma'

interface props {
	usuario: UsuarioBusqueda
	select?: Prisma.UserSelect
}

export interface UsuarioBusqueda {
	id?: string
	email?: string
	// nombreUsuario?: string
	// correoGoogle?: string
}

/**
 *
 * @param usuario Datos con los que buscar el usuario
 * @returns Usuario o null
 */
export async function ObtenerUsuarioFullService(usuario: UsuarioBusqueda): Promise<User | null> {
	return await ObtenerUsuarioCustomService({ usuario })
}

/**
 * Buscar un unario en la db
 * @param usuario objeto usuario con los datos a buscar
 * @returns Retorna {id, correo, nombreUsuario}
 */
export async function ObtenerUsuarioMinimoService(usuario: UsuarioBusqueda): Promise<User | null> {
	return ObtenerUsuarioCustomService({
		usuario,
		select: { id: true, email: true },
	})
}

export async function ObtenerUsuarioService(usuario: UsuarioBusqueda): Promise<User | null> {
	return await ObtenerUsuarioCustomService({
		usuario,
		select: { name: true, lastName: true, email: true, id: true },
	})
}

/**
 *Buscar el primer usuario que cumpla con los datos a buscar
 * @param props Datos necesarios para buscar el usuario:
 * * usuario: Datos del usuario a buscar
 * * select: Datos a obtener desde la db
 * @returns El usuario o un null
 */
export async function ObtenerUsuarioCustomService({ usuario: { email, id }, select }: props): Promise<User | null> {
	return (
		(await prisma?.user.findFirst({
			where: { OR: [{ id }, { email }] },
			select,
		})) ?? null
	)
}
