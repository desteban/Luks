'use client'

import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import ListadoGastos from '@/Services/Gastos/ListadoGastos'
import ItemIngresoGasto from '@/components/ItemsListas/ItemIngresoGasto'
import { SkeletonLite } from '@/components/skeletons/SkeletonLite'
import { useEffect, useState } from 'react'

interface props {}

async function PedirGastos(setGastos: (gastos: GastoUsuario[]) => void) {
	const listado = await ListadoGastos({ pagina: 1 })

	if (listado.errors()) {
		let err = listado.Error()
		console.error('No podemos mostrar los gastos', err)
		return
	}

	const data = listado.Right()
	setGastos(data.gastos)
}

export default function Listado({}: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [gastos, setGastos] = useState<GastoUsuario[]>([])

	useEffect(() => {
		setLoad(true)
		PedirGastos(setGastos)
		setLoad(false)
	}, [])

	const Esqueleto = () => (
		<div className="pt-2">
			<SkeletonLite />
		</div>
	)

	if (load) {
		return (
			<section aria-label="Listado de gastos">
				<Esqueleto />
				<Esqueleto />
			</section>
		)
	}

	const Gastos = () => {
		if (!gastos || !gastos.length) return null

		return gastos.map(({ createdAt, tipo, tipoGastoId, valor, id, nombre }, i) => (
			<ItemIngresoGasto
				key={id ?? i}
				fecha={new Date(createdAt)}
				valor={valor}
				nombre={nombre ?? undefined}
				icono={tipo.imagen}
			/>
		))
	}

	return (
		<section aria-label="Listado de gastos">
			<Gastos />
		</section>
	)
}
