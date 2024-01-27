import estilos from './Alerta.module.css'
import { Iconos } from './Iconos'

export type TiposAlert = 'error' | 'warning' | 'info' | 'success'

export type AlertaProps = {
	children?: React.ReactNode
	mostrar?: boolean
	texto?: string
	tipo: TiposAlert
}

export function Alerta({ texto, tipo, children, mostrar = false }: AlertaProps) {
	if (!mostrar) {
		return null
	}

	const MensajeError = () => {
		const mensaje: string[] = texto?.split('\n') ?? []

		return (
			<>
				{mensaje.map((linea, index) => (
					<div key={index}>{linea}</div>
				))}
			</>
		)
	}

	// return <Alert severity={alerta.tipo}>{children ?? <MensajeError />}</Alert>;
	return (
		<div className={`${estilos.alerta} ${MatchEstilo(tipo)}`}>
			<Iconos tipoAlerta={tipo} />
			<MensajeError />
			{children}
		</div>
	)
}

export const MatchEstilo = (tipo: TiposAlert): string => {
	const TiposAlert = {
		error: estilos.error,
		warning: estilos.alerta,
		info: estilos.info,
		success: estilos.success,
	}

	return TiposAlert[tipo] ?? ''
}
