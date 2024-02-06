import { ErrorCustom, PropsError } from '../ErrorCustom'

export class CrearActualizarGastoError extends Error implements ErrorCustom {
	StatusHttp: number = 400
	contenido?: any
	constructor({ contenido, mensaje = 'Algo ha fallado al guardar la información.' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
