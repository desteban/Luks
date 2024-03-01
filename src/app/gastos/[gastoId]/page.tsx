'use client'

import { AgregarGastoSchema } from '@/Modules/Gastos/Schemas/AgregarGasto'
import { GastoUsuario } from '@/Modules/Gastos/Services/GastosUsuario'
import EditarGasto from '@/Services/Gastos/EditarGasto'
import { ObtenerGasto } from '@/Services/Gastos/ObtenerGasto'
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
import { toast } from 'sonner'

interface props {
	params: { gastoId: string }
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

export default function Page({ params: { gastoId } }: props) {
	const [load, setLoad] = useState<boolean>(true)
	const [gasto, setGasto] = useState<GastoUsuario | null>(null)
	const [errores, setErrores] = useState<Errores>({})

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

	const ValidarFormulario = (): boolean => {
		if (gasto === null) {
			return false
		}

		const ErroresValidacion = Validar(gasto.valor.toString(), gasto.tipoGastoId, gasto.nombre ?? undefined)
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
		if (!formularioValidado || gasto === null) {
			return
		}

		setLoad(true)
		const valor = parseFloat(gasto.valor.toString())
		const nombre = gasto.nombre ?? undefined
		const respuesta = await EditarGasto({ id: gastoId, tipo: gasto?.tipoGastoId, valor, nombre })
		if (respuesta.errors()) {
			if (respuesta.Error() instanceof ErrorParseSchema) {
				setErrores(AgruparErrores(respuesta.Error()?.contenido))
				return
			}

			console.error('La tarea tiene un error: ', respuesta.Error())
			const mensaje: string = respuesta.Error()?.message ?? 'Algo ha salido mal.'
			AlertaToast({ mensaje, tipo: 'error' })
		}

		if (respuesta.Right()) {
			AlertaToast({ mensaje: 'Gasto actualizado con éxito.', tipo: 'success' })
		}

		setLoad(false)
	}

	if (load && gasto === null) {
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
				{load ? <LoaderCircular /> : null}

				<Input
					id="nombre"
					name="nombre"
					label="Nombre del gasto"
					autoComplete="off"
					value={gasto.nombre ?? ''}
					onChange={Change}
					mensajeError={errores.nombre}
				/>

				<InputMoneda
					id="valor"
					name="valor"
					label="Valor"
					autoComplete="off"
					value={gasto.valor?.toString() ?? ''}
					onChange={ChangeValor}
					required
					mensajeError={errores.valor}
				/>

				<Input
					id="fecha"
					name="fecha"
					label="Fecha"
					value={new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'long', day: '2-digit' }).format(
						new Date(gasto.createdAt),
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
