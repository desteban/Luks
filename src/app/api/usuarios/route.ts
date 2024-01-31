import { CrearUsuarioSchema } from '@/Modules/Usuarios/Schemas/CrearUsuario.Schema'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { NextRequest } from 'next/server'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import { CrearUsuarioService } from '@/Modules/Usuarios/Services/CrearUsuario.Service'
import { CantidadTotalUsuarios, ObtenerUsuariosService } from '@/Modules/Usuarios/Services/ObtenerUsuarios'
import { ObtenerParamsPaginacion } from '@/lib/Paginacion'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { ObtenerUsuarioFullService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import EditarUsuarioService from '@/Modules/Usuarios/Services/EditarUsuario'
import { ActuaizarUsuarioSchema } from '@/Modules/Usuarios/Schemas/ActualizarUsuario.Schema'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'

export async function GET(req: NextRequest) {
	const session = await SessionEnServidor()

	if (!session) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	const datosPaginacion = ObtenerParamsPaginacion(req)
	const total = await CantidadTotalUsuarios()
	const usuarios = await ObtenerUsuariosService({ ...datosPaginacion })

	return RespuestaJson({
		data: {
			usuarios,
			pagina: datosPaginacion.pagina + 1,
			porPagina: datosPaginacion.porPagina,
			totalPaginas: Math.round(total / datosPaginacion.porPagina) + 1,
		},
	})
}

export async function POST(req: Request) {
	const schema = CrearUsuarioSchema
	const datosBody = await ObtenerDatosRequest({ req })
	const datos = EjecutarSchema(schema, datosBody)
	if (datos.errors()) {
		return RespuestaJsonError(datos.Error() as ErrorCustom)
	}

	const usuarioNuevo = await CrearUsuarioService(datos.Right())
	if (usuarioNuevo.errors()) {
		return RespuestaJsonError(usuarioNuevo.Error() as ErrorCustom)
	}

	delete usuarioNuevo.Right().id
	return RespuestaJson({ data: usuarioNuevo.Right(), config: { status: 201 } })
}

export async function PUT(req: Request) {
	let session = await SessionEnServidor()
	if (!session || !session.user?.email) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	const datosBody = await ObtenerDatosRequest({ req })
	const data = EjecutarSchema(ActuaizarUsuarioSchema, datosBody)
	if (data.errors()) {
		return RespuestaJsonError(data.Error() as ErrorCustom)
	}

	let usuario = await ObtenerUsuarioFullService({ correo: session.user.email })
	if (!usuario) {
		return RespuestaJsonError(new UserNotFound({}))
	}

	const usuarioActualizado = await EditarUsuarioService({ idUsuario: usuario.id, data: data.Right() })
	if (usuarioActualizado.errors()) {
		return RespuestaJsonError(usuarioActualizado.Error() as ErrorCustom)
	}

	return RespuestaJson({
		data: { mensaje: 'Usuario editado', usuario: usuarioActualizado.Right() },
		config: { status: 200 },
	})
}
