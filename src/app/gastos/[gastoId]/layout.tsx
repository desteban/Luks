import Card from '@/components/Card/Card'
import FlechaIzquierda from '@iconos/FlechaIzquierda'
import { Metadata } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Gasto',
}

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<p className="mb-3">
				<Link
					href="/gastos"
					className="text-black flex items-center"
					title="Gastos"
				>
					<FlechaIzquierda />
					Gastos
				</Link>
			</p>
			<Card>{children}</Card>
		</div>
	)
}
