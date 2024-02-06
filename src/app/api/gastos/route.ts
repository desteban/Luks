import { AgregarGastoSchema, AgregarGastoTipo } from '@/Modules/Gastos/Schemas/AgregarGasto'
import AgregarGasto from '@/Modules/Gastos/Services/AgregarGasto'
import ObtenerTipoGasto from '@/Modules/Gastos/TipoGastos/Services/ObtenerTipoGasto'
import { ObtenerUsuarioService } from '@/Modules/Usuarios/Services/ObtenerUsuario'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { UserNotFound, UsuarioSinSession } from '@/lib/Errors'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import ObtenerDatosRequest from '@/lib/ObtenerDatosRequest'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	const session = await SessionEnServidor()
	if (!session) return RespuestaJsonError(new UsuarioSinSession({}))

	const body = await ObtenerDatosRequest({ req })
	const datos = EjecutarSchema(AgregarGastoSchema, body)
	if (datos.errors()) return RespuestaJsonError(datos.Error() as ErrorCustom)

	const usuario = await ObtenerUsuarioService({ email: session.user.email ?? '' })
	if (!usuario) return RespuestaJsonError(new UserNotFound({}))

	const { tipo, valor } = datos.Right() as AgregarGastoTipo
	const tipoGasto = await ObtenerTipoGasto(tipo)
	if (tipoGasto.errors()) return RespuestaJsonError(tipoGasto.Error() as ErrorCustom)

	const gasto = await AgregarGasto({
		tipoGasto: tipoGasto.Right(),
		usuario: usuario,
		valor: valor,
	})

	if (gasto.errors()) return RespuestaJsonError(gasto.Error() as ErrorCustom)

	return RespuestaJson({ data: gasto.Right(), config: { status: 201 } })
}

// export async function POST(req: NextRequest) {
// 	const session = await SessionEnServidor()
// 	if (!session) {
// 		return RespuestaJsonError(new UsuarioSinSession({}))
// 	}

// 	const body = await ObtenerDatosRequest({ req })
// 	const datos = EjecutarSchema(AgregarGastoSchema, body)
// 	if (datos.errors()) {
// 		return RespuestaJsonError(datos.Error() as ErrorCustom)
// 	}

// 	const usuario = await ObtenerUsuarioService({ email: session.user.email ?? '' })
// 	if (!usuario) {
// 		return RespuestaJsonError(new UserNotFound({}))
// 	}

// 	const json = datos.Right() as AgregarGastoTipo
// 	const tipoGasto = await ObtenerTipoGasto(json.tipo)
// 	if (tipoGasto.errors()) {
// 		return RespuestaJsonError(tipoGasto.Error() as ErrorCustom)
// 	}

// 	const gasto = await AgregarGasto({
// 		tipoGasto: tipoGasto.Right(),
// 		usuario: usuario,
// 		valor: json.valor,
// 	})

// 	if (gasto.errors()) {
// 		return RespuestaJsonError(gasto.Error() as ErrorCustom)
// 	}

// 	return RespuestaJson({ data: gasto.Right(), config: { status: 201 } })
// }

// 13 -47
