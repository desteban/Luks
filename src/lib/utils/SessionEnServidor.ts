import { ObtenerUsuarioService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { User } from '@prisma/client'
import { Session, getServerSession } from 'next-auth'

export default async function SessionEnServidor(): Promise<User | null> {
	const session = await getServerSession()

	if (!session || !session.user.email) {
		return null
	}

	const usuario = await ObtenerUsuarioService({ email: session.user.email })
	if (!usuario) {
		return null
	}

	return usuario
}
