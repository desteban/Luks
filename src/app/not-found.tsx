import InicioSesion from '@/components/Links/InicioSesion'
import NoData from '@public/ilustraciones/NoData'

export default function Page() {
	return (
		<div className="flex items-center justify-center h-svh w-svw">
			<div>
				<h1 className="text-center">404</h1>
				<div className="flex items-center justify-center">
					<NoData className="w-1/2 m-0 p-0 max-h-64" />
				</div>

				<p className="mt-2 mx-6">
					Parece que no encontramos la pagina que estas buscando, te podemos llevar al <InicioSesion />
				</p>
			</div>
		</div>
	)
}
