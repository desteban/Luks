import { AgregarIngresoSchema } from '@/Modules/Ingresos/Schemas/AgregarIngresos'
import AgregarIngreso from '@/Modules/Ingresos/Services/AgregarIngreso'
import { IngresosDelUsuario } from '@/Modules/Ingresos/Services/IngresosUsuario'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'
import { ObtenerParamsPaginacion } from '@/lib/Paginacion'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import { HTTPStatusCode } from '@/lib/StatusHttp'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const body = await ObtenerDatosRequest({ req })
	const data = await EjecutarSchema(AgregarIngresoSchema, body)
	if (data.errors() || !data.Right()) {
		return RespuestaJsonError(data.Error() as ErrorCustom)
	}

	const ingreso = await AgregarIngreso(session.id, data.Right())
	if (ingreso.errors()) {
		return RespuestaJsonError(ingreso.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: 'Ingreso registrado exitosamente', config: { status: HTTPStatusCode.Created } })
}

export async function GET(req: NextRequest) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const datosDePaginacion = ObtenerParamsPaginacion(req)
	const ingresos = await IngresosDelUsuario(
		session.id,
		datosDePaginacion.pagina ?? 1,
		datosDePaginacion.porPagina ?? 30,
	)

	if (ingresos.errors()) {
		return RespuestaJsonError(ingresos.Error() as ErrorCustom)
	}

	return RespuestaJson({
		data: ingresos.Right(),
	})
}
