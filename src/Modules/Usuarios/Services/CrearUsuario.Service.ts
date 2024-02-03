import { Either } from '@/lib/Either'
import { UserDuplicated } from '@/lib/Errors/Usuarios/UserDuplicated'
import { User } from '@prisma/client'
import { ObtenerUsuarioMinimoService, UsuarioBusqueda } from './ObtenerUsuario'
import { prisma } from '@/lib/Prisma'
import { SelectColumnasUsuario } from '../Schemas/SelectColumnas'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { Encriptar } from '@/lib/Encriptacion'
import { ErroresEncriptacion } from '@/lib/Encriptacion/ErroresEncriptacion'

interface props {
	id?: string
	name: string
	lastName: string | null
	// nombreUsario?: string
	// estadoCuenta: number
	email: string
	// password: string
	// correoGoogle?: string
	// createdAt: Date;
	// updatedAt: Date;
}

interface usuario extends User {
	password?: string | null
}

export async function CrearUsuarioService(data: usuario): Promise<Either<ErroresUsuarios, User>> {
	let either = new Either<ErroresUsuarios, User>()

	const usuarioExiste = await ObtenerUsuarioMinimoService(data as UsuarioBusqueda)
	let datosUsuarioCrear = usuarioExiste
	// datosUsuarioCrear.estadoCuenta = 1

	if (usuarioExiste && datosUsuarioCrear) {
		if (
			usuarioExiste.id === data.id &&
			usuarioExiste.email !== data.email
			// usuarioExiste.nombreUsuario !== data.nombreUsuario
		) {
			const usuarioCrear = { ...usuarioExiste, ...datosUsuarioCrear } as any
			delete usuarioCrear.id
			return await CrearUsuarioService({
				...usuarioCrear,
			} as User)
		}

		either.setError(
			new UserDuplicated({
				mensaje: 'Datos no validos para crear una cuenta',
				contenido: {
					// nombreUsuario: data.nombreUsuario === usuarioExiste.nombreUsuario,
					email: data.email === usuarioExiste.email,
				},
			}),
		)
		return either
	}

	const encriptacion = await EncriptarPassword(data.password)
	if (encriptacion.errors()) {
		either.setError(encriptacion.Error() as ErroresUsuarios)
		return either
	}
	data.password = encriptacion.Right()
	const user = await prisma.user.create({
		data,
		select: SelectColumnasUsuario(),
	})
	either.setRight(user as unknown as User)
	return either
}

async function EncriptarPassword(password: string | null | undefined) {
	if (!password) {
		let either = new Either<ErroresEncriptacion, string | null>()
		either.setRight(null)
		return either
	}

	let encriptado = await Encriptar(password)
	console.log('hash creado: ', encriptado.Right())
	return encriptado
}
