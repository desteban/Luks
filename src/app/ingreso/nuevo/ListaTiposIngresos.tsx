import ItemTipoIngresoGasto from '@/components/ItemsListas/ItemTipoIngresoGasto'
import estilos from './Estilos.module.css'
import { TiposIngresos } from '@prisma/client'

interface props {
	idTipo: number | null
	listado: TiposIngresos[]
	setIdTipo: (id: number) => void
}

export function ListaTiposIngresos({ idTipo, listado, setIdTipo }: props) {
	return (
		<div
			className={estilos.opciones}
			aria-label="Listado de tipos de ingresos"
		>
			{listado.map(({ descrip, id, imagen, nombre }) => {
				return (
					<ItemTipoIngresoGasto
						key={id}
						id={id}
						nombre={nombre}
						src={imagen}
						setIdActivo={setIdTipo}
						idActivo={idTipo}
					/>
				)
			})}
		</div>
	)
}
