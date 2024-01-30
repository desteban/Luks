import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Gastos',
	description: 'Registra aquí tus gastos para saber en donde está tu dinero',
}

export default function Layout({ children }: { children: ReactNode }) {
	return <main>{children}</main>
}
