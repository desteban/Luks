import Container from '@/components/Container/Container'
import { Nav } from '@/components/nav/Nav'
import FlechaIzquierda from '@iconos/FlechaIzquierda'
import Link from 'next/link'
import Listado from './Listado'
import Card from '@/components/Card/Card'
import estilos from './Estilos.module.css'

export default async function Page() {
	return (
		<main>
			<Nav />

			<Container>
				<p className="mb-3 w-6">
					<Link
						href="/inicio"
						className="text-black"
						title="Inicio"
					>
						<FlechaIzquierda />
					</Link>
				</p>

				<h1>Tus gastos</h1>
				<Card className={estilos.listado}>
					<Listado />
				</Card>
			</Container>
		</main>
	)
}
