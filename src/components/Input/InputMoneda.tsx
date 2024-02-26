import { ChangeEvent, useState } from 'react'
import { Input as InputShadcn } from '@ui/input'
import estilos from './estilos.module.css'
import { Decimal } from '@prisma/client/runtime/library'

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
	pattern?: string
	placeHolder?: string
	required?: boolean
	type?: tipoInput
	value?: string
	title?: string
}

function formatearComoMoneda(numero: number): string {
	console.log('recibe', numero)
	const partes = numero.toFixed(2).split('.')
	const monto = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	// const decimales = partes[1] === '00' ? '' : '.' + partes[1]

	// console.log(monto + decimales)
	return monto.toString()
}

export default function InputMoneda(props: props) {
	const { mensajeError, className, required, label, value, onChange } = props

	const MensajeError = () => {
		if (!mensajeError) {
			return null
		}

		return <div className="text-red-200 px-1 py-1 mt-2 rounded-md">{mensajeError}</div>
	}

	const Change = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const valueSinPuntos = value.replaceAll('.', '')
		const valor: number = parseFloat(valueSinPuntos)

		if (isNaN(valor)) {
			return
		}

		const valorConFormato: string = formatearComoMoneda(valor)
		console.log('formateado', valorConFormato)
		onChange(valorConFormato)
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
						value={value}
						pattern="^-?\d+(\.\d+)?$"
						title="1.000"
						inputMode="numeric"
					/>
				</div>
			</label>
			<MensajeError />
		</div>
	)
}
