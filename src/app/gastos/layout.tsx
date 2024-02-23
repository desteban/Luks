import { Metadata } from 'next'
import { ReactNode } from 'react'
import Contenedor from './Contenedor'

export const metadata: Metadata = {
	title: 'Gastos',
	description: 'Aquí puedes saber cuales son tus gastos',
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
