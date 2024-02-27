import { HTTPStatusCode } from '../StatusHttp'
import { ErrorCustom, PropsError } from './ErrorCustom'

export class ServicioNoDisponible extends Error implements ErrorCustom {
	StatusHttp: number = HTTPStatusCode.ServiceUnavailable
	contenido?: any
	constructor({
		contenido,
		mensaje = 'No pudimos obtener la información, necesaria, por favor inténtalo mas tarde',
	}: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
