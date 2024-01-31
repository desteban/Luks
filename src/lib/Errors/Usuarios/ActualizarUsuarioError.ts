import { ErrorCustom, PropsError } from '../ErrorCustom'

export class ActualizarUsuarioError extends Error implements ErrorCustom {
	StatusHttp: number = 409
	contenido?: any
	constructor({ contenido, mensaje = 'Algunos datos no son validos' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
