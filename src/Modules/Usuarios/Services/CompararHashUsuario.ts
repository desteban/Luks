import { Usuario } from '@prisma/client'
import { CompararHash } from '@/lib/Encriptacion'

export default async function CompararHashUsuarioService(usuario: Usuario, password: string): Promise<boolean> {
	if (!usuario.password) {
		return true
	}

	let compararHash = await CompararHash(password, usuario.password)
	if (compararHash.errors()) {
		return false
	}

	return compararHash.Right()
}
