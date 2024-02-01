import { prisma } from '@/lib/Prisma'
import { Usuario } from '@prisma/client'
import { Either } from '@/lib/Either'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { ActuaizarUsuarioType } from '../Schemas/ActualizarUsuario.Schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ActualizarUsuarioError } from '@/lib/Errors/Usuarios/ActualizarUsuarioError'
import { ServerError } from '@/lib/Errors/ServerError'
import { SelectColumnasUsuario } from '../Schemas/SelectColumnas'

interface props {
	data: ActuaizarUsuarioType
	idUsuario: string
}

export default async function EditarUsuarioService({
	data,
	idUsuario,
}: props): Promise<Either<ErroresUsuarios, Usuario>> {
	const either = new Either<ErroresUsuarios, Usuario>()
	const datos = SelectColumnasUsuario({ nombreUsuario: true, correoGoogle: true })

	try {
		const usuario = await prisma.usuario.update({ where: { id: idUsuario }, data, select: datos })
		either.setRight(usuario as Usuario)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log(error.meta?.target)

			either.setError(new ActualizarUsuarioError({ contenido: error.meta?.target ?? [] }))
		} else {
			either.setError(new ServerError({}))
		}
	}

	return either
}
