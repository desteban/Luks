import GastosLineaDashboad from '@/Modules/Dashboard/Services/GastosLineaDashboad'
import IngresosLineaDashboard from '@/Modules/Dashboard/Services/IngresosLineaDashboard'
import TotalGastosUsuarioDashboard from '@/Modules/Dashboard/Services/TotalGastosUsuarioDashboard'
import TotalIngresosUsuarioDashboard from '@/Modules/Dashboard/Services/TotalIngresosUsuarioDashboard'
import { UsuarioSinSession } from '@/lib/Errors'
import { RespuestaJson, RespuestaJsonError } from '@/lib/RespuestaJson'
import SessionEnServidor from '@/lib/utils/SessionEnServidor'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const usuario = await SessionEnServidor()
	if (!usuario) {
		return RespuestaJsonError(new UsuarioSinSession({}))
	}

	const meses = 4

	//Gráfico de lineas
	const gastoslineas = await GastosLineaDashboad(usuario.id, meses)
	const ingresosLinea = await IngresosLineaDashboard(usuario.id, meses)

	// Gráfico de sectores
	const totalGastos = await TotalGastosUsuarioDashboard(usuario.id)
	const totalIngresos = await TotalIngresosUsuarioDashboard(usuario.id)

	return RespuestaJson({
		data: {
			mensaje: 'data',
			linea: {
				gastos: gastoslineas.Right() || [],
				ingresos: ingresosLinea.Right() || [],
			},
			totalMes: {
				gastos: totalGastos.Right() || null,
				// ingresos: totalIngresos.Right() || null,
			},
		},
	})
}
