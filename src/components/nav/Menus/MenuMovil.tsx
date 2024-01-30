import { useSession } from 'next-auth/react'
import Link from 'next/link'
import EnlaceMenu from './EnlaceMenu'

interface props {
	onClick?: () => void
}

export default function MenuMovil({ onClick }: props) {
	const session = useSession()

	const MenuSinSession = () => {
		return null
	}

	const MenuConSession = () => {
		return (
			<div
				className="bg-gray-200 text-black p-5"
				onClick={onClick}
			>
				<ul>
					<li>
						<EnlaceMenu
							href="/inicio"
							title="Inicio"
						>
							Inicio
						</EnlaceMenu>
					</li>
					<li>
						<EnlaceMenu
							href="/ingresos"
							title="Ingresos"
						>
							Ingresos
						</EnlaceMenu>
					</li>
					<li>
						<EnlaceMenu
							href="/gastos"
							title="Gastos"
						>
							Gastos
						</EnlaceMenu>
					</li>
				</ul>
			</div>
		)
	}

	if (session.status === 'unauthenticated') {
		return <MenuSinSession />
	}

	return <MenuConSession />
}
