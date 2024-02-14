import { ErrorCustom, PropsError } from '@/lib/Errors/ErrorCustom'

export class CrearActualizarIngresoError extends Error implements ErrorCustom {
	StatusHttp: number = 400
	contenido?: any
	constructor({ contenido, mensaje = 'Algo ha fallado al guardar la información del ingreso.' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
