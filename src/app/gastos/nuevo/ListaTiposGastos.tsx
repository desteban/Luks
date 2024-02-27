import ItemTipoIngresoGasto from '@/components/ItemsListas/ItemTipoIngresoGasto'
import estilos from './Estilos.module.css'
import { TiposGastos } from '@prisma/client'

interface props {
	idTipo: number | null
	listado: TiposGastos[]
	setIdTipo: (id: number) => void
}

export function ListaTiposGastos({ idTipo, listado, setIdTipo }: props) {
	return (
		<div
			className={estilos.opciones}
			aria-label="Listado de tipos de gastos"
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
