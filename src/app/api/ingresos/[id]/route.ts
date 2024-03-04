import { EditarIngresoSchema } from '@/Modules/Ingresos/Schemas/EditarIngreso'
import EditarIngreso from '@/Modules/Ingresos/Services/EditarIngreso'
import EncontrarIngreso from '@/Modules/Ingresos/Services/EncontrarIngreso'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'
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

export async function PUT(req: NextRequest, { params }: Slug) {
	const usuario = await SessionEnServidor()
	if (!usuario) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	const body = await ObtenerDatosRequest({ req })
	const data = await EjecutarSchema(EditarIngresoSchema, body)
	if (data.errors()) {
		return RespuestaJsonError(data.Error() as ErrorCustom)
	}

	const IngresoActualizado = await EditarIngreso({ ingresoId: params.id, userId: usuario.id, data: data.Right() })
	if (IngresoActualizado.errors()) {
		return RespuestaJsonError(IngresoActualizado.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: IngresoActualizado.Right() })
}
