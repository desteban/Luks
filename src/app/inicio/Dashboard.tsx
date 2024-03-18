'use client'

import estilos from './Estilos.module.css'
import GraficasDashboard from '@/Services/Dashboard/GraficasDashboard'
import AlertaToast from '@/components/Alerta/AlertaToast'
import SkeletonCard from '@/components/skeletons/SkeletonCard'
import { ReactNode, useEffect, useState } from 'react'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	Radar,
} from 'recharts'
import { RegistroGraficaRadar } from '../../..'

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
	const [RadarGastos, setRadarGastos] = useState<RegistroGraficaRadar[]>([])

	useEffect(() => {
		GraficasDashboard()
			.then((either) => {
				if (either.errors()) {
					AlertaToast({ mensaje: either.Error()?.message || 'No pudimos generar las gráficas' })
					console.error(either.Error())
					return
				}

				setIngresosVsGastos(ParseData(either.Right()))
				setRadarGastos(either.Right().totalMes.gastos)
			})
			.finally(() => {
				setLoad(false)
			})
	}, [])

	const Grafico = ({ children, titulo }: { children: ReactNode; titulo?: string }) => {
		return (
			<div className={estilos['graficos-item']}>
				<h3 className="font-semibold">{titulo}</h3>

				<div className={estilos['graficos-item-container']}>{children}</div>
			</div>
		)
	}

	const IngresosVsGastosGrafico = () => (
		<Grafico titulo="Ingresos Vs Gastos">
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
		</Grafico>
	)

	const RadarGastoGrafica = () => {
		if (RadarGastos.length < 3) {
			return (
				<div>
					<p>No tienes datos suficientes para generar esta gráfica</p>
				</div>
			)
		}

		return (
			<Grafico titulo="Tus gastos este mes">
				<ResponsiveContainer
					height={300}
					width={'100%'}
					aspect={16 / 9}
				>
					<RadarChart
						cx="50%"
						cy="50%"
						outerRadius="80%"
						data={RadarGastos}
					>
						<PolarGrid />
						<PolarAngleAxis
							dataKey={'tema'}
							fontSize={12}
						/>
						<Tooltip />
						<Radar
							dataKey={'valor'}
							stroke={StrokeGastos}
							fill={StrokeGastos}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</Grafico>
		)
	}

	if (load) {
		return (
			<div className={estilos.graficos}>
				<SkeletonCard />
				<SkeletonCard />
			</div>
		)
	}

	return (
		<div className={estilos.graficos}>
			<IngresosVsGastosGrafico />
			<RadarGastoGrafica />
		</div>
	)
}
