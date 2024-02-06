import { ErrorCustom, PropsError } from '../ErrorCustom'

export class GastoNoEncontrado extends Error implements ErrorCustom {
	StatusHttp: number = 404
	contenido?: any
	constructor({ contenido, mensaje = 'No  se ha encontrado el gasto solicitado.' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
