import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Nuevo Gasto',
	description: 'Registra aquí tus gastos para saber en donde está tu dinero',
}

export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
