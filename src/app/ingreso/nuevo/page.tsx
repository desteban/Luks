import Card from '@/components/Card/Card'
import FlechaIzquierda from '@iconos/FlechaIzquierda'
import Link from 'next/link'
import Formulario from './Formulario'
import TiposIngresosService from '@/Services/Ingresos/TiposIngresosService'

export default async function Page() {
	const tiposGastos = await TiposIngresosService()

	if (tiposGastos.errors()) {
		return (
			<div>
				<p>Hemos tenido algunos problemas, inténtalo mas tarde</p>
			</div>
		)
	}

	return (
		<div className="pb-8">
			<div>
				<p className="mb-3 w-6">
					<Link
						href="/inicio"
						className="text-black"
						title="Inicio"
					>
						<FlechaIzquierda size={24} />
					</Link>
				</p>

				<h1>Registra tus ingresos</h1>
			</div>

			<Card>
				<Formulario
					tiposGastos={tiposGastos.Right() ?? []}
					mensajeErro={tiposGastos.Error()?.message}
				/>
			</Card>
		</div>
	)
}
