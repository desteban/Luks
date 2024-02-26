import { ChangeEvent } from 'react'
import { Input as InputShadcn } from '@ui/input'
import estilos from './estilos.module.css'

export type tipoInput = 'text' | 'number' | 'email' | 'date' | 'year' | 'month' | 'password'

interface props {
	autoComplete?: 'on' | 'off'
	className?: string
	disabled?: boolean
	id: string
	label: string
	mensajeError?: string
	name: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeHolder?: string
	required?: boolean
	type?: tipoInput
	value?: string
	title?: string
}

export default function Input(props: props) {
	const { mensajeError, className, required, label } = props

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
					{...props}
					className=""
				/>
			</label>
			<MensajeError />
		</div>
	)
}
