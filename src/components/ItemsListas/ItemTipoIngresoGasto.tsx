import estilos from './Estilos.module.css'
import Card from '../Card/Card'

interface props {
	className?: string
	descripcion?: string | null
	id: number
	idActivo?: number | null
	nombre: string
	setIdActivo: (id: number) => void
	src?: string | null
}

export default function ItemTipoIngresoGasto({
	nombre,
	descripcion,
	src,
	className,
	id,
	idActivo,
	setIdActivo,
}: props) {
	const click = async () => {
		setIdActivo(id)
	}

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
		<Card
			className={`${estilos['tipo-item']} ${className ?? ''}`}
			onClick={click}
		>
			<div>
				<div
					className={`${estilos['tipo-item-circulo']} ${id === idActivo ? estilos['tipo-item-circulo-activo'] : ''}`}
				></div>
				<Imagen />
				<p className="m-0 mt-2 font-semibold">{nombre}</p>
			</div>
		</Card>
	)
}
