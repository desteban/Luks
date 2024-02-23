import estilos from './Estilos.module.css'
import Card from '../Card/Card'

interface props {
	descripcion?: string | null
	nombre: string
	src?: string | null
	className?: string
}

export default function ItemTipoIngresoGasto({ nombre, descripcion, src, className }: props) {
	const Imagen = () => {
		if (!src) {
			return null
		}

		return (
			<figure>
				<img
					src={src}
					alt={nombre}
					height={48}
					width={48}
					className={estilos['tipo-item-imagen']}
				/>
			</figure>
		)
	}

	return (
		<Card className={`${estilos['tipo-item']} ${className ?? ''}`}>
			<div className="">
				<Imagen />
				<p className="m-0 mt-2 font-semibold">{nombre}</p>
			</div>
		</Card>
	)
}
