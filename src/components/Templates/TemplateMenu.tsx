import { ReactNode } from 'react'
import { Nav } from '../nav/Nav'
import estilos from './Estilos.module.css'

interface props {
	children: ReactNode
}

export default function TemplateMenu({ children }: props) {
	return (
		<main className={estilos.contenedor}>
			<Nav />
			<div className={`${estilos.contenido}`}>{children}</div>
		</main>
	)
}
