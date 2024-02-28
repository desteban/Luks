import { ObtenerPrimerosTiposIngresos } from '@/Modules/Tipos/TipoIngresos/Services/ObtenerTiposIngresos'
import { ErrorCustom } from '@/lib/Errors/ErrorCustom'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const listado = await ObtenerPrimerosTiposIngresos()
	if (listado.errors()) {
		return RespuestaJsonError(listado.Error() as ErrorCustom)
	}

	return RespuestaJson({ data: listado.Right() })
}
