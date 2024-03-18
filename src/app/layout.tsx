import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Luks',
	description:
		'Controlar tus finanzas nunca ha sido tan fácil. Luks es tu compañero ideal para gestionar tus gastos e ingresos de manera eficiente y mantener tus finanzas bajo control.',
	icons: {
		icon: '/app.ico',
		apple: '/app.ico',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es-Co">
			<body className={inter.className}>
				<Providers>
					{/* <Nav /> */}
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
