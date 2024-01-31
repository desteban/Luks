import estilos from './estilos.module.css'
import { ReactNode } from 'react'

interface props {
	children: ReactNode
	className?: string
	onClick?: () => void
}

export default function Card({ children, className, onClick }: props) {
	return (
		<div
			className={`${estilos.sombra} ${estilos.card} ${className ?? ''}`}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
