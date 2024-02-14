import { ErrorCustom, PropsError } from '../ErrorCustom'

export class ConexionDbError extends Error implements ErrorCustom {
	StatusHttp: number = 503
	contenido?: any
	constructor({ contenido, mensaje = 'No podemos  establecer conexión a la base de datos.' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
