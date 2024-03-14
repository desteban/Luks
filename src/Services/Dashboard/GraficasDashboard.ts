import { DashboardError } from '@/Modules/Dashboard/Errors/DashboardError'
import { Either } from '@/lib/Either'
import ErrorConexionServidor from '@/lib/ErrorConexionServidor'
import { ServerError } from '@/lib/Errors/ServerError'
import { ServicioNoDisponible } from '@/lib/Errors/ServicioNoDisponible'
import { RutasAPI, UrlApi } from '@/lib/Globales'

export interface GraficasDashboardTipo {
	mensaje: string
	linea: Linea
	totalMes: TotalMes
}

interface Linea {
	gastos: Gastos
	ingresos: Ingresos
}

interface Gastos {
	'2024-2': string
	'2023-12': string
}

interface Ingresos {
	'2024-2': string
}

interface TotalMes {
	gastos: string
	ingresos: string
}

export default async function GraficasDashboard(): Promise<Either<DashboardError, GraficasDashboardTipo>> {
	let either = new Either<DashboardError, GraficasDashboardTipo>()
	const url: string = UrlApi + RutasAPI.dashboard

	try {
		const respuesta = await fetch(url)

		if (!respuesta.ok) {
			either.setError(new ServerError({}))
			return either
		}

		const json = await respuesta.json()
		either.setRight(json as GraficasDashboardTipo)
	} catch (error) {
		if (ErrorConexionServidor(error)) {
			either.setError(new ServicioNoDisponible({}))
		} else either.setError(new ServerError({}))
	}

	return either
}
