import { CompararHash } from '@/lib/Encriptacion'
import { User } from '@prisma/client'

export default async function CompararHashUsuarioService(usuario: User, password: string): Promise<boolean> {
	if (!usuario.password) {
		return true
	}

	let compararHash = await CompararHash(password, usuario.password)
	if (compararHash.errors()) {
		return false
	}

	return compararHash.Right()
}
