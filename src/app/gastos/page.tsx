import Card from '@/components/Card/Card'
import CardBody from '@/components/Card/CardBody'
import Container from '@/components/Container/Container'
import ItemIngresoGasto from '@/components/ItemsListas/ItemIngresoGasto'
import { Nav } from '@/components/nav/Nav'
import FlechaIzquierda from '@iconos/FlechaIzquierda'
import Link from 'next/link'

export default async function Page() {
	return (
		<main>
			<Nav />

			<Container>
				<Link
					href="/inicio"
					className="text-black"
				>
					<FlechaIzquierda />
				</Link>

				<h1>Tus gastos</h1>
				<Card>
					<CardBody>
						<ItemIngresoGasto
							nombre="Nombre"
							fecha={new Date()}
							icono="/app.ico"
							valor={1000000}
						/>
						<ItemIngresoGasto
							nombre="Nombre muy pero que muy largo"
							fecha={new Date()}
							icono="/app.ico"
							valor={1000000}
						/>
					</CardBody>
				</Card>
			</Container>
		</main>
	)
}
