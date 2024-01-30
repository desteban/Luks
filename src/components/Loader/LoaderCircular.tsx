import estilos from './Estilos.module.css'

interface props {
	full?: boolean
}
export function LoaderCircular({ full = false }) {
	return (
		<div className={`${estilos.centrado} ${full ? estilos.full : ''}`}>
			<div className={estilos.loader}></div>
		</div>
	)
}
