'use client'

import estilos from './Estilos.module.css'
import Card from '@/components/Card/Card'
import Input from '@/components/Input/Inputs'
import ItemTipoIngresoGasto from '@/components/ItemsListas/ItemTipoIngresoGasto'
import { Button } from '@/components/ui/button'
import FlechaIzquierda from '@iconos/FlechaIzquierda'
import Link from 'next/link'
import { FormEvent } from 'react'

async function AgregarIngreso() {}

export default function Page() {
	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await AgregarIngreso()
	}

	const Tipos = () => {
		return (
			<div className={estilos.opciones}>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
				<ItemTipoIngresoGasto
					nombre="Nombre"
					src={'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png'}
				/>
			</div>
		)
	}

	return (
		<div className="pb-8">
			<div>
				<p className="mb-3 w-6">
					<Link
						href="/inicio"
						className="text-black"
						title="Inicio"
					>
						<FlechaIzquierda />
					</Link>
				</p>

				<h1>Ingresa tu gasto</h1>
			</div>

			<Card>
				<form
					onSubmit={Submit}
					className={estilos.formulario}
				>
					<Input
						id="nombre"
						label="Nombre"
						name="nombre"
						placeHolder="Nombre del gasto"
						className="mb-5"
					/>

					<Input
						id="valor"
						name="valor"
						label="Valor"
						placeHolder="10.000"
						required
						className="mb-5"
					/>

					<div aria-label="Listado de tipo de gastos">
						<h3>Seleccione un tipo de gasto</h3>
						<Tipos />
					</div>
					<div className={estilos.peg}>
						<Button className={estilos.boton}>Guardar</Button>
					</div>
				</form>
			</Card>
		</div>
	)
}
