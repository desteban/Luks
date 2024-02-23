import EncontrarIngreso from '@/Modules/Ingresos/Services/EncontrarIngreso'
import { UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

interface Slug {
	params: { id: string }
}

export async function GET(request: NextRequest, { params }: Slug) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const ingreso = await EncontrarIngreso(params.id, session.id)
	if (ingreso.errors()) {
		return RespuestaJsonError(ingreso.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: ingreso.Right() })
}
