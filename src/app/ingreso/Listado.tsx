'use client'

import { IngresosUsuario } from '@/Modules/Ingresos/Services/IngresosUsuario'
import ListadoIngresosService from '@/Services/Ingresos/ListadoIngresosService'
import ItemIngresoGasto from '@/components/ItemsListas/ItemIngresoGasto'
import { SkeletonLite } from '@/components/skeletons/SkeletonLite'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface props {}

async function PedirIngresos(
	pagina: number,
	setIngresos: (gastos: IngresosUsuario[]) => void,
	setTotal: (total: number) => void,
	abortSignal?: AbortSignal,
	// setPage: (page: number) => void,
) {
	const listado = await ListadoIngresosService({ pagina: pagina, abortSignal, resultados: 1 })

	if (listado.errors()) {
		let err = listado.Error()
		console.error('No podemos mostrar los gastos', err)
		return
	}

	const data = listado.Right()
	setIngresos(data.ingresos ?? [])
	setTotal(data.totalPaginas)
	// setPage(data.pagina)
}

export default function Listado({}: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [ingresos, setIngresos] = useState<IngresosUsuario[]>([])
	const [page, setPage] = useState<number>(1)
	const [total, setTotal] = useState<number>(1)

	useEffect(() => {
		let abort = new AbortController()
		let ignorar = false

		async function Activar() {
			const signal = abort.signal

			if (!ignorar) {
				try {
					await PedirIngresos(page, ConcatenarIngresos, setTotal, signal)
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

	const ConcatenarIngresos = (ingresos: IngresosUsuario[]) => {
		setIngresos((ingresosAntiguos) => ingresosAntiguos.concat(ingresos))
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

	const Ingresos = () => {
		if (!ingresos || !ingresos.length) return null

		return ingresos.map(({ createdAt, tipo, valor, id, nombre }, i) => (
			<Link
				key={id ?? i}
				href={`/ingreso/${id}`}
				className="text-black"
			>
				<ItemIngresoGasto
					fecha={new Date(createdAt)}
					valor={valor}
					nombre={nombre ?? undefined}
					icono={tipo.imagen}
				/>
			</Link>
		))
	}

	return (
		<section aria-label="Listado de gastos">
			<Ingresos />

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
