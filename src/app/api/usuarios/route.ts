import ObtenerDatosRquest from '@/lib/ObtenerDatosRquest'
import { CrearUsuarioSchema } from '@/Modules/Usuarios/Schemas/CrearUsuario.Schema'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { NextRequest } from 'next/server'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import { CrearUsuarioService } from '@/Modules/Usuarios/Services/CrearUsuario.Service'
import { CantidadTotalUsuarios, ObtenerUsuariosService } from '@/Modules/Usuarios/Services/ObtenerUsuarios'
import { ObtenerParamsPaginacion } from '@/lib/Paginacion'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { UsuarioSinSession } from '@/lib/Errors'

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
	const datosBody = await ObtenerDatosRquest({ req })
	const datos = EjecutarSchema(schema, datosBody)
	if (datos.errors()) {
		return RespuestaJsonError(datos.Error() as ErrorCustom)
	}

	const usuarioNuevo = await CrearUsuarioService(datos.Right())
	if (usuarioNuevo.errors()) {
		return RespuestaJsonError(usuarioNuevo.Error() as ErrorCustom)
	}

	delete usuarioNuevo.Right().id
	return RespuestaJson({ data: usuarioNuevo.Right() })
}
