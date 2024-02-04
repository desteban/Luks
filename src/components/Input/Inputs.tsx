import { ChangeEvent } from 'react'
import { Input as InputShadcn } from '@ui/input'
import estilos from './estilos.module.css'

export type tipoInput = 'text' | 'number' | 'email' | 'date' | 'year' | 'month' | 'password'

interface props {
	autoComplete?: 'on' | 'off'
	className?: string
	disabled?: boolean
	mensajeError?: string
	id: string
	label: string
	name: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	placeHolder?: string
	required?: boolean
	type?: tipoInput
	value?: string
}

export default function Input({
	autoComplete = 'on',
	className = '',
	disabled = false,
	id,
	label,
	name,
	onChange,
	placeHolder,
	required = false,
	type = 'text',
	value,
	mensajeError,
}: props) {
	const MensajeError = () => {
		if (!mensajeError) {
			return null
		}

		return <div className="text-red-200 px-1 py-1 mt-2 rounded-md">{mensajeError}</div>
	}

	return (
		<div className={className}>
			<label className={`flex flex-col form-control gap-1`}>
				<div className="label cursor-pointer">
					<span
						className={`label-text ${required ? estilos['is-required'] : ''} ${mensajeError ? 'text-red-400' : ''}`}
					>
						{label}
					</span>
				</div>

				<InputShadcn
					id={id}
					name={name}
					type={type}
					placeholder={placeHolder}
					required={required}
					value={value}
					disabled={disabled}
					autoComplete={autoComplete}
					onChange={onChange}
				/>
			</label>
			<MensajeError />
		</div>
	)
}
