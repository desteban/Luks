import { Prisma, Usuario } from '@prisma/client'
import { prisma } from '@/lib/Prisma'

interface props {
	usuario: UsuarioBusqueda
	select?: Prisma.UsuarioSelect
}

export interface UsuarioBusqueda {
	id?: string
	correo?: string
	nombreUsuario?: string
	correoGoogle?: string
}

/**
 *
 * @param usuario Datos con los que buscar el usuario
 * @returns Usuario o null
 */
export async function ObtenerUsuarioFullService(usuario: UsuarioBusqueda): Promise<Usuario | null> {
	return await ObtenerUsuarioCustomService({ usuario })
}

/**
 * Buscar un unario en la db
 * @param usuario objeto usuario con los datos a buscar
 * @returns Retorna {id, correo, nombreUsuario}
 */
export async function ObtenerUsuarioMinimoService(usuario: UsuarioBusqueda): Promise<Usuario | null> {
	return ObtenerUsuarioCustomService({
		usuario,
		select: { id: true, correo: true, nombreUsuario: true, correoGoogle: true },
	})
}

/**
 *Buscar el primer usuario que cumpla con los datos a buscar
 * @param props Datos necesarios para buscar el usuario:
 * * usuario: Datos del usuario a buscar
 * * select: Datos a obtener desde la db
 * @returns El usuario o un null
 */
export async function ObtenerUsuarioCustomService({
	usuario: { correo, id, nombreUsuario, correoGoogle },
	select,
}: props): Promise<Usuario | null> {
	return (
		(await prisma?.usuario.findFirst({
			where: { OR: [{ id }, { correo }, { nombreUsuario }, { correoGoogle }] },
			select,
		})) ?? null
	)
}
