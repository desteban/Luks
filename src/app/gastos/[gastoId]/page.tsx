'use client'

import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import { ObtenerGasto } from '@/Services/Gastos/ObtenerGasto'
import InputMoneda from '@/components/Input/InputMoneda'
import Input from '@/components/Input/Inputs'
import { LoaderCircular } from '@/components/Loader/LoaderCircular'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface props {
	params: { gastoId: string }
}

export default function Page({ params: { gastoId } }: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [gasto, setGasto] = useState<GastoUsuario | null>(null)

	useEffect(() => {
		const getData = async () => {
			const gasto = await ObtenerGasto(gastoId)

			if (gasto.Right()) {
				// const {} = gasto.Right()
				setGasto(gasto.Right())
			}

			setLoad(false)
		}

		getData()
	}, [])

	const Change = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		if (gasto) {
			let gastoActual = gasto
			setGasto({ ...gastoActual, [name]: value })
		}
	}

	const ChangeValor = (valor: string) => {
		if (gasto) {
			let gastoActual = gasto
			setGasto({ ...gastoActual, valor })
		}
	}

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		console.log(gasto)
	}

	if (load) {
		return <LoaderCircular />
	}

	if (gasto === null) {
		return (
			<section aria-label="gasto">
				<h1>¡Ups!. No encontramos el gasto solicitado</h1>
				<p>
					No encontramos el gasto que estas buscando, si quieres puedes ver{' '}
					<Link
						href={'/gastos'}
						title="Gastos"
					>
						tus gastos
					</Link>{' '}
					para estar seguros de lo que buscas.
				</p>
			</section>
		)
	}

	return (
		<div>
			<h1>Información del gasto</h1>

			<form onSubmit={Submit}>
				<Input
					id="nombre"
					name="nombre"
					label="Nombre del gasto"
					autoComplete="off"
					value={gasto.nombre ?? ''}
					onChange={Change}
				/>

				<InputMoneda
					id="valor"
					name="valor"
					label="Valor"
					autoComplete="off"
					value={gasto.valor?.toString() ?? ''}
					onChange={ChangeValor}
				/>

				<Input
					id="fecha"
					name="fecha"
					label="Fecha"
					value={new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'long', day: '2-digit' }).format(
						new Date(gasto.createdAt),
					)}
					disabled
				/>

				<Button
					className="w-full"
					type="submit"
				>
					Actualizar
				</Button>
			</form>
		</div>
	)
}
