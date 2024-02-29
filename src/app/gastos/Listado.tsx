'use client'

import { GastoUsuario, GastosUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import ListadoGastos from '@/Services/Gastos/ListadoGastos'
import ItemIngresoGasto from '@/components/ItemsListas/ItemIngresoGasto'
import { SkeletonLite } from '@/components/skeletons/SkeletonLite'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface props {}

async function PedirGastos(
	pagina: number,
	setGastos: (gastos: GastoUsuario[]) => void,
	setTotal: (total: number) => void,
	abortSignal?: AbortSignal,
	// setPage: (page: number) => void,
) {
	const listado = await ListadoGastos({ pagina: pagina, abortSignal })

	if (listado.errors()) {
		let err = listado.Error()
		console.error('No podemos mostrar los gastos', err)
		return
	}

	const data = listado.Right()

	setTotal(data.totalPaginas)
	setGastos(data.gastos)
	// setPage(data.pagina)
}

export default function Listado({}: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [gastos, setGastos] = useState<GastoUsuario[]>([])
	const [page, setPage] = useState<number>(1)
	const [total, setTotal] = useState<number>(1)

	useEffect(() => {
		let abort = new AbortController()
		let ignorar = false

		async function Activar() {
			const signal = abort.signal

			if (!ignorar) {
				try {
					await PedirGastos(page, ConcatenarGastos, setTotal, signal)
				} catch {
					console.log('abort')
				}
			}
		}

		setLoad(true)
		Activar().finally(() => {
			setLoad(false)
		})

		return () => {
			ignorar = true
			abort.abort()
		}
	}, [page])

	const ConcatenarGastos = (gastos: GastoUsuario[]) => {
		setGastos((gastosAntiuos) => gastosAntiuos.concat(gastos))
	}

	const Esqueleto = () => (
		<div className="pt-2">
			<SkeletonLite />
		</div>
	)

	const Loader = () => {
		if (load === false) {
			return null
		}

		return (
			<div>
				<Esqueleto />
				<Esqueleto />
			</div>
		)
	}

	const Buscar = async () => {
		const pagina = page + 1
		if (pagina > total) {
			alert('Tomó mucho tiempo, pero has llegado al final de los registros')
			return
		}

		setPage(pagina)
	}

	const Gastos = () => {
		if (!gastos || !gastos.length) return null

		return (
			<>
				{gastos.map(({ createdAt, tipo, tipoGastoId, valor, id, nombre }, i) => (
					<ItemIngresoGasto
						key={id ?? i}
						fecha={new Date(createdAt)}
						valor={valor}
						nombre={nombre ?? undefined}
						icono={tipo.imagen}
					/>
				))}
			</>
		)
	}

	return (
		<section aria-label="Listado de gastos">
			<Gastos />

			<Loader />

			<Button
				className="w-full mt-4"
				onClick={Buscar}
			>
				Cargar mas
			</Button>
		</section>
	)
}
