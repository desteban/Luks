import { ObtenerUsuarioService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'

export async function GET() {
	const session = await SessionEnServidor()
	if (!session || !session.user?.email) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	const usuario = await ObtenerUsuarioService({ correo: session.user.email, correoGoogle: session.user.email })
	if (!usuario) {
		return RespuestaJsonError(new UserNotFound({}))
	}

	return RespuestaJson({ data: usuario })
}
