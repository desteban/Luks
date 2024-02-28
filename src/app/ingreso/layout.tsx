import { Metadata } from 'next'
import { ReactNode } from 'react'
import Contenedor from './Contenedor'

export const metadata: Metadata = {
	title: 'Ingresos',
	description: '¿Quieres saber como generas dinero?, aquí lo puedes saber',
}

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<main>
			<Contenedor>
				<>{children}</>
			</Contenedor>
		</main>
	)
}
