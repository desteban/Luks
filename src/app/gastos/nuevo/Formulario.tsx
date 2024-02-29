'use client'

import estilos from './Estilos.module.css'
import InputMoneda from '@/components/Input/InputMoneda'
import Input from '@/components/Input/Inputs'
import { Button } from '@/components/ui/button'
import { FormEvent, useState } from 'react'
import { ListaTiposGastos } from './ListaTiposGastos'
import { TiposGastosFront } from '@/Services/Gastos/TiposGastosService'
import ErrorSimple from '@/components/Errores/ErrorSimple'
import { EjecutarSchema } from '@/lib/EjecutarSchema'
import { AgregarGastoSchema } from '@/Modules/Gastos/Schemas/AgregarGasto'
import { AgruparErrores } from '@/lib/AgruparErrores'
import AgregarGastoService from '@/Services/Gastos/AgregarGastoService'
import { Alerta, AlertaProps } from '@/components/Alerta/Alerta'

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
	const valorGasto = parseFloat(valorSinPuntos)
	const data = {
		nombre,
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

async function AgregarIngreso(nombre: string | null, valor: string, tipo: number): Promise<string | true> {
	let valorSinPuntos = valor.replaceAll(/\./g, '')
	const valorGasto = parseFloat(valorSinPuntos)
	const data = {
		nombre: nombre?.length === 0 ? null : nombre,
		valor: isNaN(valorGasto) ? '' : valorGasto,
		tipo,
	}

	const respuesta = await AgregarGastoService({
		nombre: nombre?.length === 0 ? undefined : nombre,
		valor: isNaN(valorGasto) ? 0 : valorGasto,
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
	const [valorGasto, setValorGasto] = useState<string>('')
	const [tipo, setIdTipo] = useState<number | null>(null)
	const [erroresInput, setErrroresInput] = useState<Errores>({})
	const [mensajeAlerta, setMensajeAlerta] = useState<AlertaProps>({ tipo: 'info' })

	const Submit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setMensajeAlerta({ tipo: 'info', mostrar: true, texto: 'Guardando...' })

		let error = Validar(valorGasto, tipo, nombre)
		if (error) {
			setErrroresInput(error)
			return
		}

		setErrroresInput({})
		const resultado = await AgregarIngreso(nombre, valorGasto, tipo!)
		if (resultado !== true) {
			setMensajeAlerta({ tipo: 'error', texto: resultado, mostrar: true })
			return
		}

		setMensajeAlerta({ tipo: 'success', texto: 'Gasto registrado con éxito', mostrar: true })
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
			<ListaTiposGastos
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

	return (
		<form
			onSubmit={Submit}
			className={estilos.formulario}
			aria-label="Agregar gasto"
		>
			<Alerta {...mensajeAlerta} />

			<Input
				id="nombre"
				label="Nombre"
				name="nombre"
				className="mb-5"
				value={nombre}
				onChange={(e) => setNombre(e.currentTarget.value)}
				placeholder="Nombre del gasto"
				mensajeError={erroresInput?.nombre}
			/>

			<InputMoneda
				id="moneda"
				label="Valor"
				name="moneda"
				className="mb-6"
				value={valorGasto}
				onChange={setValorGasto}
				required
				placeholder="1.000"
				mensajeError={erroresInput.valor}
			/>

			<div aria-label="Listado de tipo de gastos">
				<h3 className="is-required">Seleccione un tipo de gasto:</h3>
				<ErrorTipoGasto />
				<Tipos />
			</div>
			<div className={estilos.peg}>
				<Button className={estilos.boton}>Guardar</Button>
			</div>
		</form>
	)
}