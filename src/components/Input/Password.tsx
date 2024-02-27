'use client'

import { ChangeEvent, useState } from 'react'
import { Input as InputShadcn } from '@ui/input'
import estilos from './estilos.module.css'
import OjoIcon from '../../../public/iconos/OjosIcon'
import { tipoInput } from './Inputs'
import { OjoCerrado } from '../../../public/iconos/OjoCerrado'
import ErrorSimple from '../Errores/ErrorSimple'

interface props {
	className?: string
	disabled?: boolean
	mensajeError?: string
	id: string
	label: string
	name: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	required?: boolean
	value?: string
}

export default function Password({
	className = '',
	disabled = false,
	mensajeError,
	id,
	label,
	name,
	onChange,
	placeholder,
	required = false,
	value,
}: props) {
	// true es password, false es text
	const [tipoInput, setTipoInput] = useState<boolean>(true)

	const CambiarTipoInput = () => {
		setTipoInput(!tipoInput)
	}

	const MensajeError = () => {
		if (!mensajeError) {
			return null
		}

		return <ErrorSimple mensaje={mensajeError} />
	}

	return (
		<div>
			<label className={`flex flex-col form-control gap-1 ${className}`}>
				<div className="label cursor-pointer">
					<span className={`label-text ${required ? estilos['is-required'] : ''}`}>{label}</span>
				</div>

				<div className="relative">
					<InputShadcn
						id={id}
						name={name}
						type={tipoInput ? 'password' : 'text'}
						placeholder={placeholder}
						required={required}
						value={value}
						disabled={disabled}
						autoComplete={'OFF'}
						onChange={onChange}
						className={estilos['input-icono']}
					/>
					<span
						className={estilos.icono}
						onClick={CambiarTipoInput}
					>
						{tipoInput ? <OjoIcon /> : <OjoCerrado />}
					</span>
				</div>
			</label>
			<MensajeError />
		</div>
	)
}
