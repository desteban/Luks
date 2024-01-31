import { ErrorCustom, PropsError } from './ErrorCustom'

export class ServerError extends Error implements ErrorCustom {
	StatusHttp: number = 500
	contenido?: any
	constructor({ contenido, mensaje = 'Algo ha salido mal al realizar esta tarea' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
