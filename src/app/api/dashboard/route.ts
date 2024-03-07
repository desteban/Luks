import GastosDashboard from '@/Modules/Dashboard/Services/GastosDashboard'
import GastosLineaDashboad from '@/Modules/Dashboard/Services/GastosLineaDashboad'
import IngresosDashboard from '@/Modules/Dashboard/Services/IngresosDashboard'
import { UsuarioSinSession } from '@/lib/Errors'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const usuario = await SessionEnServidor()
	if (!usuario) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	let desde = new Date()
	desde.setMonth(desde.getMonth() - 4)
	let ingresos = await IngresosDashboard(usuario.id)
	let gastos = await GastosDashboard(usuario.id, desde)

	//grafico de lineas
	let gastoslineas = await GastosLineaDashboad(usuario.id, 3)

	return RespuestaJson({
		data: {
			mensaje: 'data',
			linea: {
				gastos: gastoslineas.Right() || [],
			},
			// sectores: {
			// 	ingresos: ingresos.Right() || [],
			// 	gastos: gastos.Right() || [],
			// },
		},
	})
}
