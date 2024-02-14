import { AgregarGastoSchema } from '@/Modules/Gastos/Schemas/AgregarGasto'
import EditarGasto, { BuscarGasto } from '@/Modules/Gastos/Services/EditarGasto'
import { ObtenerUsuarioMinimoService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { Either } from '@/lib/Either'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { User } from '@prisma/client'
import { NextRequest } from 'next/server'

interface Slug {
	params: { id: string }
}

export async function GET(request: NextRequest, { params }: Slug) {
	const UsuarioSession = await ValidarSesionUsuario()
	if (UsuarioSession.errors()) {
		return RespuestaJsonError(UsuarioSession.Error() as ErrorCustom)
	}

	const usuario = UsuarioSession.Right()
	const gasto = await BuscarGasto(params.id, usuario.id)
	if (gasto.errors()) {
		return RespuestaJsonError(gasto.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: gasto.Right() })
}

export async function PUT(request: NextRequest, { params: { id } }: Slug) {
	const UsuarioSession = await ValidarSesionUsuario()
	if (UsuarioSession.errors()) {
		return RespuestaJsonError(UsuarioSession.Error() as ErrorCustom)
	}

	const usuario = UsuarioSession.Right() as User
	const body = await ObtenerDatosRequest({ req: request })
	const datos = EjecutarSchema(AgregarGastoSchema, body)
	if (datos.errors()) return RespuestaJsonError(datos.Error() as ErrorCustom)

	const { valor, nombre, tipo } = datos.Right()
	const gastoEditado = await EditarGasto(id, usuario.id, valor, tipo, nombre)
	if (gastoEditado.errors()) return RespuestaJsonError(gastoEditado.Error() as ErrorCustom)

	return RespuestaJson({ data: { mensaje: 'Gasto editado con éxito', gasto: gastoEditado.Right() } })
}

async function ValidarSesionUsuario(): Promise<Either<ErrorCustom, User>> {
	let either = new Either<ErrorCustom, User>()

	const session = await SessionEnServidor()
	if (!session) {
		either.setError(new UsuarioSinSession({}))
		return either
	}

	const usuario = await ObtenerUsuarioMinimoService({ email: session.user.email ?? '' })
	if (!usuario) {
		either.setError(new UserNotFound({}))
		return either
	}

	either.setRight(usuario)
	return either
}
