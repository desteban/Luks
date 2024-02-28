import FlechaIzquierda from '@iconos/FlechaIzquierda'
import Link from 'next/link'
import Listado from './Listado'
import Card from '@/components/Card/Card'
import estilos from './Estilos.module.css'

export default async function Page() {
	return (
		<>
			<p className="mb-3 w-6">
				<Link
					href="/inicio"
					className="text-black"
					title="Inicio"
				>
					<FlechaIzquierda />
				</Link>
			</p>

			<h1>Tus Ingresos</h1>
			<Card className={estilos.listado}>
				<Listado />
			</Card>
		</>
	)
}
