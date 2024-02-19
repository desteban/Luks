import AjustarTexto from '@/lib/AjustarTexto'
import estilos from './Estilos.module.css'

interface props {
	fecha: Date
	icono?: string
	nombre?: string
	valor: number | string
}

function ObtenerDia(fecha: Date): string {
	let dia = fecha.getDate()

	if (dia < 10) {
		return '0' + dia
	}

	return '' + dia
}

function ObtenerMes(fecha: Date): string {
	let mes = fecha.getMonth() + 1

	if (mes < 10) {
		return '0' + mes
	}

	return '' + mes
}

export default function ItemIngresoGasto({ fecha, icono, nombre, valor }: props) {
	const IconoItem = () => {
		if (!icono) {
			return null
		}

		return (
			<figure>
				<img
					className={estilos['item-icono-img']}
					src={icono}
					alt="Icono"
				/>
			</figure>
		)
	}

	const NombreItem = () => {
		if (!nombre) {
			return null
		}

		return <p className={estilos['item-contenido-info-nombre']}>{AjustarTexto(nombre, 15)}</p>
	}

	const FechaItem = () => {
		return (
			<span className={estilos['item-contenido-info-fecha']}>
				{/* {new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: '2-digit' }).format(fecha)} */}
				{`${ObtenerDia(fecha)}/${ObtenerMes(fecha)}`}
			</span>
		)
	}

	return (
		<div className={estilos.item}>
			<div className={estilos['item-icono']}>
				<IconoItem />
			</div>

			<div className={estilos['item-contenido']}>
				<div className={estilos['item-contenido-info']}>
					<NombreItem />
					<FechaItem />
				</div>

				<p className={estilos['item-contenido-valor']}>${valor.toLocaleString()}</p>
			</div>
		</div>
	)
}
