import { ErrorCustom, PropsError } from '@/lib/Errors/ErrorCustom'

export class IngresoNoEncontrado extends Error implements ErrorCustom {
	StatusHttp: number = 404
	contenido?: any
	constructor({ contenido, mensaje = 'Ingreso no encontrado' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
