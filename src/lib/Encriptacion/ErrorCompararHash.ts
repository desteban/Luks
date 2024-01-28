import { ErrorCustom } from '../Errors/ErrorCustom'

export default class ErrorCompararHash extends Error implements ErrorCustom {
	readonly StatusHttp: number = 500
	readonly contenido?: any

	constructor(mensaje: string = 'Error al desencriptar información') {
		super(mensaje)
	}
}
