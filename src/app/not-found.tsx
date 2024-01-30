import NoData from '@public/ilustraciones/NoData'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex items-center justify-center h-svh w-svw">
			<div>
				<h1 className="text-center">404</h1>
				<div className="flex items-center justify-center">
					<NoData className="w-1/2 m-0 p-0 max-h-64" />
				</div>

				<p className="mt-2 mx-6">
					Parece que no encontramos la pagina que estas buscando, te podemos llevar al{' '}
					<Link
						href="/"
						title="Inicio"
					>
						inicio
					</Link>
				</p>
			</div>
		</div>
	)
}
