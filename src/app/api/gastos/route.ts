import { AgregarGastoSchema, AgregarGastoTipo } from '@/Modules/Gastos/Schemas/AgregarGasto'
import AgregarGasto from '@/Modules/Gastos/Services/AgregarGasto'
import { GastosUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import PaginacionGastos from '@/Modules/Gastos/Services/PaginacionGastos'
import ObtenerTipoGasto from '@/Modules/Tipos/TipoGastos/Services/ObtenerTipoGasto'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'
import { ObtenerParamsPaginacion } from '@/lib/Paginacion'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const datosPaginacion = ObtenerParamsPaginacion(req)
	const gastos = await GastosUsuario(session.id, datosPaginacion.pagina, datosPaginacion.porPagina)
	if (gastos.errors()) {
		return RespuestaJsonError(gastos.Error() as ErrorCustom)
	}

	const datosDePaginacion = await PaginacionGastos(session.id, datosPaginacion.pagina, datosPaginacion.porPagina)

	return RespuestaJson({
		data: {
			...datosDePaginacion,
			gastos: gastos.Right(),
		},
	})
}

export async function POST(req: NextRequest) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const body = await ObtenerDatosRequest({ req })
	const datos = EjecutarSchema(AgregarGastoSchema, body)
	if (datos.errors()) return RespuestaJsonError(datos.Error() as ErrorCustom)

	const { tipo, valor, nombre } = datos.Right() as AgregarGastoTipo
	const tipoGasto = await ObtenerTipoGasto(tipo)
	if (tipoGasto.errors()) return RespuestaJsonError(tipoGasto.Error() as ErrorCustom)

	const gasto = await AgregarGasto({
		tipoGasto: tipoGasto.Right(),
		usuario: session,
		valor: valor,
		nombre,
	})

	if (gasto.errors()) return RespuestaJsonError(gasto.Error() as ErrorCustom)

	return RespuestaJson({ data: gasto.Right(), config: { status: 201 } })
}
