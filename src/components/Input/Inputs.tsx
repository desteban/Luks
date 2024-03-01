import { ChangeEvent, InputHTMLAttributes } from 'react'
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
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	required?: boolean
	type?: tipoInput
	value?: string
	title?: string
}

// export interface props extends React.InputHTMLAttributes<HTMLInputElement> {
// 	placeHolder?: string
// 	label: string
// 	mensajeError: string
// }

export default function Input({ mensajeError, label, className, required, ...props }: props) {
	const MensajeError = () => {
		if (!mensajeError) {
			return null
		}

		return <ErrorSimple mensaje={mensajeError} />
	}

	return (
		<div className={`mb-3 ${className ?? ''}`}>
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
