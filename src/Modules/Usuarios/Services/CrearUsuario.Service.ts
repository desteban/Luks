import { Either } from '@/lib/Either'
import { UserDuplicated } from '@/lib/Errors/Usuarios/UserDuplicated'
import { User } from '@prisma/client'
import { ObtenerUsuarioMinimoService, UsuarioBusqueda } from './ObtenerUsuario'
import { prisma } from '@/lib/Prisma'
import { ErroresUsuarios } from '@/lib/Errors/Usuarios/ErroresUsuarios'
import { Encriptar } from '@/lib/Encriptacion'
import { ErroresEncriptacion } from '@/lib/Encriptacion/ErroresEncriptacion'
import { CrearUsuarioTipo } from '../Schemas/CrearUsuario.Schema'

export async function CrearUsuarioService(data: CrearUsuarioTipo): Promise<Either<ErroresUsuarios, User>> {
	let either = new Either<ErroresUsuarios, User>()

	const usuarioExiste = await ObtenerUsuarioMinimoService(data as UsuarioBusqueda)

	if (usuarioExiste) {
		//validar si el id ya fue registrado, si es el caso se genera otro id en
		if (usuarioExiste.id === data.id && usuarioExiste.email !== data.email) {
			let datosUsuarioCrear = usuarioExiste
			const usuarioCrear = { ...usuarioExiste, ...datosUsuarioCrear } as any
			delete usuarioCrear.id
			return await CrearUsuarioService(usuarioCrear)
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

	//crear el registro
	const user = await prisma.user.create({ data, select: { email: true, name: true, lastName: true } })
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
	return encriptado
}
