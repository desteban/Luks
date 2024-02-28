import {
	ObtenerOtrosTiposGastos,
	ObtenerPrimerosTiposGastos,
} from '@/Modules/Tipos/TipoGastos/Services/ObtenerTiposGastos'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams
	const otros: boolean = params.get('otros') ? true : false

	//validar si se pide  los primeros o otros tipos de gastos
	if (otros) {
		const otrosTiposGastos = await ObtenerOtrosTiposGastos()

		if (otrosTiposGastos.errors()) {
			return RespuestaJsonError(otrosTiposGastos.Error() as ErrorCustom)
		}

		return RespuestaJson({ data: otrosTiposGastos.Right() })
	}

	const tiposGastos = await ObtenerPrimerosTiposGastos()
	if (tiposGastos.errors()) {
		return RespuestaJsonError(tiposGastos.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: tiposGastos.Right() })
}
