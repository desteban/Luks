'use client'

import estilos from './Estilos.module.css'
import GraficasDashboard from '@/Services/Dashboard/GraficasDashboard'
import AlertaToast from '@/components/Alerta/AlertaToast'
import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Registro {
	name: string
	ingresos?: number
	gastos?: number
}

const StrokeIngresos = '#82ca9d'
const StrokeGastos = '#8884d8'

/**
 * Formatea los datos para realizar un gráfico de lineas o de area
 * @param datos
 * @returns
 */
function ParseData(datos: any) {
	const registros: Registro[] = []

	const { gastos, ingresos } = datos.linea

	for (const key in ingresos) {
		if (ingresos.hasOwnProperty(key) && gastos.hasOwnProperty(key)) {
			const ingreso = ingresos[key]
			const gasto = gastos[key]
			if (ingreso !== undefined && gasto !== undefined) {
				registros.push({
					name: key,
					ingresos: ingreso ? parseInt(ingreso) : 0,
					gastos: gasto ? parseInt(gasto) : 0,
				})
			}
		}
	}

	return registros.reverse()
}

export default function Dasboard() {
	const [load, setLoad] = useState<boolean>(true)
	const [IngresosVsGastos, setIngresosVsGastos] = useState<Registro[]>([])

	useEffect(() => {
		GraficasDashboard()
			.then((either) => {
				if (either.errors()) {
					AlertaToast({ mensaje: either.Error()?.message || 'No pudimos generar las gráficas' })
					console.error(either.Error())
					return
				}

				setIngresosVsGastos(ParseData(either.Right()))
			})
			.finally(() => {
				setLoad(false)
			})
	}, [])

	const IngresosVsGastosGrafico = () => (
		<div className={estilos['graficos-item']}>
			<h3 className="font-semibold">Ingresos vs Gastos</h3>

			<div className={estilos['graficos-item-container']}>
				<ResponsiveContainer
					className={'max-h-72'}
					width={'100%'}
					aspect={16 / 9}
				>
					<AreaChart
						className=""
						height={300}
						data={IngresosVsGastos}
						margin={{
							top: 0,
							right: 35,
							left: 38,
							bottom: 0,
						}}
					>
						{/* <CartesianGrid strokeDasharray="3 3" /> */}
						<XAxis
							dataKey="name"
							angle={0}
							padding={{ left: 8, right: 8 }}
						/>
						<YAxis
							hide
							fontSize={8}
						/>
						<Tooltip />
						<Legend />
						<Area
							type="monotone"
							dataKey="ingresos"
							stroke={StrokeIngresos}
							fill={StrokeIngresos}
							fillOpacity={0.3}
						/>
						<Area
							type="monotone"
							dataKey="gastos"
							stroke={StrokeGastos}
							fill={StrokeGastos}
							fillOpacity={0.3}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)

	if (load) {
		return (
			<div>
				<p>Generando gráficas...</p>
			</div>
		)
	}

	return (
		<div className={estilos.graficos}>
			<IngresosVsGastosGrafico />
		</div>
	)
}
