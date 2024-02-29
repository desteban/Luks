import { ChangeEvent, useState } from 'react'
import { Input as InputShadcn } from '@ui/input'
import estilos from './estilos.module.css'
import ErrorSimple from '../Errores/ErrorSimple'

export type tipoInput = 'text' | 'number' | 'email' | 'date' | 'year' | 'month' | 'password'

interface props {
	autoComplete?: 'on' | 'off'
	className?: string
	disabled?: boolean
	id: string
	label: string
	mensajeError?: string
	name: string
	onChange: (valor: string) => void
	// onChange: (Event: ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	required?: boolean
	type?: tipoInput
	value: string
	title?: string
}

function formatearComoMoneda(numero: number): string {
	const partes = numero.toFixed(2).split('.')
	const monto = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	// const decimales = partes[1] === '00' ? '' : '.' + partes[1]

	// console.log(monto + decimales)
	return monto.toString()
}

function Formatear(valor: string) {
	if (valor === '') {
		return ''
	}

	const valueSinPuntos = valor.replaceAll('.', '')
	const numero: number = parseFloat(valueSinPuntos)

	if (isNaN(numero)) {
		console.error(`Error al formatear el valor del campo.`)
		return valor
	}

	return formatearComoMoneda(numero)
}

export default function InputMoneda({ mensajeError, label, className, required, onChange, value, ...props }: props) {
	const MensajeError = () => {
		if (!mensajeError) {
			return null
		}

		return <ErrorSimple mensaje={mensajeError} />
	}

	const Change = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget

		if (value === '') {
			onChange(value)
			return
		}

		const valueSinPuntos = value.replaceAll('.', '')
		const valor: number = parseFloat(valueSinPuntos)

		if (isNaN(valor)) {
			return
		}

		onChange(valueSinPuntos)

		// const valorConFormato: string = formatearComoMoneda(valor)
		// onChange(valorConFormato)
	}

	return (
		<div className={className}>
			<label className={`flex flex-col form-control gap-1 relative`}>
				<div className="label cursor-pointer">
					<span
						className={`label-text ${required ? estilos['is-required'] : ''} ${mensajeError ? 'text-red-400' : ''}`}
					>
						{label}
					</span>
				</div>

				<div className="relative">
					<span className="absolute h-full flex items-center justify-center px-1">$</span>

					<InputShadcn
						{...props}
						className="pl-4 tracking-wide"
						type="text"
						onChange={Change}
						value={Formatear(value)}
						pattern="^\d{1,3}(.\d{3})*$"
						title="1.000"
						inputMode="numeric"
					/>
					{/* ^-?\d+(\.\d+)?$ numeros negativos */}
					{/* ^\d+(\.\d+)?$  solo numeros positivos */}
					{/* ^\d{1,3}(.\d{3})*$ */}
				</div>
			</label>
			<MensajeError />
		</div>
	)
}
