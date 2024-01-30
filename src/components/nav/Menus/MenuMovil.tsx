import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function MenuMovil() {
	const session = useSession()

	const MenuSinSession = () => {
		return null
	}

	const MenuConSession = () => {
		return (
			<div className="bg-gray-200 text-black p-5">
				<ul>
					<li>
						<Link
							href={'/inicio'}
							title="Inicio"
						>
							Inicio
						</Link>
					</li>
					<li>Ingreso</li>
					<li>Gastos</li>
				</ul>
			</div>
		)
	}

	if (session.status === 'unauthenticated') {
		return <MenuSinSession />
	}

	return <MenuConSession />
}
