'use client'

import estilos from './Estilos.module.css'
import InputMoneda from '@/components/Input/InputMoneda'
import Input from '@/components/Input/Inputs'
import { Button } from '@/components/ui/button'
import { FormEvent, useState } from 'react'
import { TiposGastosFront } from '@/Services/Gastos/TiposGastosService'
import ErrorSimple from '@/components/Errores/ErrorSimple'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { AgruparErrores } from '@/lib/AgruparErrores'
import { Alerta, AlertaProps } from '@/components/Alerta/Alerta'
import { ListaTiposIngresos } from './ListaTiposIngresos'
import AgregarIngresoService from '@/Services/Ingresos/AgregarIngreso'
import { AgregarIngresoSchema } from '@/Modules/Ingresos/Schemas/AgregarIngresos'

interface props {
	mensajeErro?: string
	tiposGastos: TiposGastosFront[]
}

interface Errores {
	nombre?: string
	valor?: string
	tipo?: string
}

function Validar(valor: string, tipo: number | null, nombre: string): null | Errores {
	let valorSinPuntos = valor.replaceAll(/\./g, '')
	const valorIngreso = parseFloat(valorSinPuntos)
	const data = {
		nombre,
		valor: isNaN(valorIngreso) ? '' : valorIngreso,
		tipo,
	}

	const datos = EjecutarSchema(AgregarIngresoSchema, data)
	if (datos.errors()) {
		let erroresAgrupados = AgruparErrores(datos.Error()?.contenido)
		return erroresAgrupados as Errores
	}

	return null
}

async function AgregarIngreso(nombre: string | null, valor: string, tipo: number): Promise<string | true> {
	let valorSinPuntos = valor.replaceAll(/\./g, '')
	const valorIngreso = parseFloat(valorSinPuntos)

	const respuesta = await AgregarIngresoService({
		nombre: nombre?.length === 0 ? undefined : nombre,
		valor: isNaN(valorIngreso) ? 0 : valorIngreso,
		tipo,
	})

	if (respuesta.errors()) {
		console.error('Error', respuesta.Error())
		return respuesta.Error()?.message ?? 'Algo ha salido mal.'
	}

	return true
}

export default function Formulario({ tiposGastos, mensajeErro }: props) {
	const [nombre, setNombre] = useState<string>('')
	const [valorIngreso, setValorIngreso] = useState<string>('')
	const [tipo, setIdTipo] = useState<number | null>(null)
	const [erroresInput, setErrroresInput] = useState<Errores>({})
	const [mensajeAlerta, setMensajeAlerta] = useState<AlertaProps>({ tipo: 'info' })

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setMensajeAlerta({ tipo: 'info', mostrar: true, texto: 'Guardando...' })

		let error = Validar(valorIngreso, tipo, nombre)
		if (error) {
			setErrroresInput(error)
			return
		}

		setErrroresInput({})
		const resultado = await AgregarIngreso(nombre, valorIngreso, tipo!)
		if (resultado !== true) {
			setMensajeAlerta({ tipo: 'error', texto: resultado, mostrar: true })
			return
		}

		setMensajeAlerta({ tipo: 'success', texto: 'Ingreso registrado con éxito', mostrar: true })
		LimpiarFormulario()
	}

	const Tipos = () => {
		if (tiposGastos.length === 0 && mensajeErro) {
			return (
				<div>
					<p>{mensajeErro}</p>
				</div>
			)
		}

		return (
			// <pre>
			// 	<code>{JSON.stringify(tiposGastos, null, 2)}</code>
			// </pre>
			<ListaTiposIngresos
				idTipo={tipo}
				listado={tiposGastos}
				setIdTipo={setIdTipo}
			/>
		)
	}

	const ErrorTipoGasto = () => {
		if (!erroresInput?.tipo) {
			return null
		}

		return <ErrorSimple mensaje={erroresInput.tipo} />
	}

	const LimpiarFormulario = () => {
		setNombre('')
		setValorIngreso('')
		setIdTipo(null)
	}

	return (
		<form
			onSubmit={Submit}
			className={estilos.formulario}
			aria-label="registro de ingresos"
		>
			<Alerta {...mensajeAlerta} />

			<Input
				id="nombre"
				label="Nombre"
				name="nombre"
				className="mb-5"
				value={nombre}
				onChange={(e) => setNombre(e.currentTarget.value)}
				placeholder="Nombre del ingreso"
				mensajeError={erroresInput?.nombre}
				autoComplete="off"
			/>

			<InputMoneda
				id="moneda"
				label="Valor"
				name="moneda"
				className="mb-6"
				value={valorIngreso}
				onChange={setValorIngreso}
				required
				placeholder="1.000"
				mensajeError={erroresInput.valor}
				autoComplete="off"
			/>

			<div aria-label="Listado de tipo de gastos">
				<h3 className="is-required">Seleccione un tipo de ingreso:</h3>
				<ErrorTipoGasto />
				<Tipos />
			</div>
			<div className={estilos.peg}>
				<Button className={estilos.boton}>Guardar</Button>
			</div>
		</form>
	)
}
