import { ErrorCustom, PropsError } from '../ErrorCustom'

export class ErrorEstructuraDb extends Error implements ErrorCustom {
	StatusHttp: number = 400
	contenido?: any
	constructor({
		contenido,
		mensaje = 'Se han presentado errores en el formato de la información la guardar  en la base de datos.',
	}: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
