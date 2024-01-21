import { Either } from '@/lib/Either'
import { UserDuplicated } from '@/lib/Errors/Usuarios/UserDuplicated'
import { Usuario } from '@prisma/client'
import { ObtenerUsuarioMinimoService, UsuarioBusqueda } from './ObtenerUsuario'
import { prisma } from '@/lib/Prisma'
import { SelectColumnasUsuario } from '../Schemas/SelectColumnas'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'

interface props {
	id?: string
	nombre: string
	apellido: string | null
	nombreUsario?: string
	estadoCuenta: number
	correo: string
	password: string
	correoGoogle?: string
	// createdAt: Date;
	// updatedAt: Date;
}

export async function CrearUsuarioService(data: Usuario): Promise<Either<ErroresUsuarios, Usuario>> {
	let either = new Either<ErroresUsuarios, Usuario>()

	const usuarioExiste = await ObtenerUsuarioMinimoService(data as UsuarioBusqueda)
	let datosUsuarioCrear: props = data as props
	datosUsuarioCrear.estadoCuenta = 1

	if (usuarioExiste) {
		if (
			usuarioExiste.id === data.id &&
			usuarioExiste.correo !== data.correo &&
			usuarioExiste.nombreUsuario !== data.nombreUsuario
		) {
			delete datosUsuarioCrear.id
			return await CrearUsuarioService({
				...datosUsuarioCrear,
			} as Usuario)
		}

		either.setError(
			new UserDuplicated({
				mensaje: 'Datos no validos para crear una cuenta',
				contenido: {
					nombreUsuario: data.nombreUsuario === usuarioExiste.nombreUsuario,
				},
			}),
		)
		return either
	}

	const user = await prisma.usuario.create({
		data,
		select: SelectColumnasUsuario(),
	})
	either.setRight(user as Usuario)
	return either
}
