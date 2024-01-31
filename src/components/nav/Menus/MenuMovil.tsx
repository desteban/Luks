import { useSession } from 'next-auth/react'
import Link from 'next/link'
import EnlaceMenu from './EnlaceMenu'
import AjustesIcon from '@iconos/AjustesIcon'

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

					<li>
						<EnlaceMenu
							href="/perfil"
							title="Cuenta"
							className="flex gap-1 items-center"
						>
							<AjustesIcon />
							Cuenta
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
