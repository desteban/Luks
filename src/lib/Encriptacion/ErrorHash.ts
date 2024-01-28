import { ErrorCustom } from '../Errors/ErrorCustom'

export default class ErrorHash extends Error implements ErrorCustom {
	readonly StatusHttp: number = 500
	readonly contenido?: any

	constructor(mensaje: string = 'Error al encriptar información', statusCode = 500) {
		super(mensaje)
	}
}
