'use client'

import { AgregarGastoSchema } from '@/Modules/Gastos/Schemas/AgregarGasto'
import { IngresosUsuario } from '@/Modules/Ingresos/Services/IngresosUsuario'
import ObtenerIngreso from '@/Services/Ingresos/ObtenerIngreso'
import AlertaToast from '@/components/Alerta/AlertaToast'
import InputMoneda from '@/components/Input/InputMoneda'
import Input from '@/components/Input/Inputs'
import { LoaderCircular } from '@/components/Loader/LoaderCircular'
import { Button } from '@/components/ui/button'
import { AgruparErrores } from '@/lib/AgruparErrores'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { ErrorParseSchema } from '@/lib/Errors'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface props {
	params: { ingresoId: string }
}

interface Errores {
	nombre?: string
	valor?: string
	tipo?: string
}

function Validar(valor: string, tipo: number | null, nombre?: string): null | Errores {
	let valorSinPuntos = valor.replaceAll(/\./g, '')
	const valorGasto = parseFloat(valorSinPuntos)
	const data = {
		nombre: nombre ?? undefined,
		valor: isNaN(valorGasto) ? '' : valorGasto,
		tipo,
	}

	const datos = EjecutarSchema(AgregarGastoSchema, data)
	if (datos.errors()) {
		let erroresAgrupados = AgruparErrores(datos.Error()?.contenido)
		return erroresAgrupados as Errores
	}

	return null
}

export default function Page({ params: { ingresoId } }: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [ingreso, setIngreso] = useState<IngresosUsuario | null>(null)
	const [errores, setErrores] = useState<Errores>({})

	useEffect(() => {
		const getData = async () => {
			const ingreso = await ObtenerIngreso(ingresoId)
			console.log(ingreso)

			if (ingreso.Right()) {
				// const {} = ingreso.Right()
				setIngreso(ingreso.Right())
			}

			setLoad(false)
		}

		getData()
	}, [])

	const Change = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		if (ingreso) {
			let gastoActual = ingreso
			setIngreso({ ...gastoActual, [name]: value })
		}
	}

	const ChangeValor = (valor: string) => {
		if (ingreso) {
			let actual = ingreso
			setIngreso({ ...actual, valor })
		}
	}

	const ValidarFormulario = (): boolean => {
		if (ingreso === null) {
			return false
		}

		const ErroresValidacion = Validar(ingreso.valor.toString(), ingreso.tipoIngresoId, ingreso.nombre ?? undefined)
		if (ErroresValidacion !== null) {
			console.error('Error al validar la información', ErroresValidacion)
			setErrores(ErroresValidacion)
			return false
		}

		setErrores({})
		return true
	}

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formularioValidado = ValidarFormulario()
		if (!formularioValidado || ingreso === null) {
			return
		}

		setLoad(true)
		const valor = parseFloat(ingreso.valor.toString())
		const nombre = ingreso.nombre ?? undefined
		// const respuesta = await EditarGasto({ id: gastoId, tipo: gasto?.tipoGastoId, valor, nombre })
		// if (respuesta.errors()) {
		// 	if (respuesta.Error() instanceof ErrorParseSchema) {
		// 		setErrores(AgruparErrores(respuesta.Error()?.contenido))
		// 		return
		// 	}

		// 	console.error('La tarea tiene un error: ', respuesta.Error())
		// 	const mensaje: string = respuesta.Error()?.message ?? 'Algo ha salido mal.'
		// 	AlertaToast({ mensaje, tipo: 'error' })
		// }

		// if (respuesta.Right()) {
		// 	AlertaToast({ mensaje: 'Gasto actualizado con éxito.', tipo: 'success' })
		// }

		setLoad(false)
	}

	if (load && ingreso === null) {
		return <LoaderCircular />
	}

	if (ingreso === null) {
		return (
			<section aria-label="gasto">
				<h1>¡Ups!. No encontramos el ingreso solicitado</h1>
				<p>
					No encontramos el ingreso que estas buscando, si quieres puedes ver{' '}
					<Link
						href={'/ingreso'}
						title="Ingresos"
					>
						tus ingresos
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
				{load ? <LoaderCircular /> : null}

				<Input
					id="nombre"
					name="nombre"
					label="Nombre del gasto"
					autoComplete="off"
					value={ingreso.nombre ?? ''}
					onChange={Change}
					mensajeError={errores.nombre}
				/>

				<InputMoneda
					id="valor"
					name="valor"
					label="Valor"
					autoComplete="off"
					value={ingreso.valor?.toString() ?? ''}
					onChange={ChangeValor}
					required
					mensajeError={errores.valor}
				/>

				<Input
					id="fecha"
					name="fecha"
					label="Fecha"
					value={new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'long', day: '2-digit' }).format(
						new Date(ingreso.createdAt),
					)}
					disabled
					required
				/>

				<Button
					className="w-full mt-5"
					type="submit"
				>
					Actualizar
				</Button>
			</form>
		</div>
	)
}
