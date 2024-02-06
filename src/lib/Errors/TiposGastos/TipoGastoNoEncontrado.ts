import { ErrorCustom, PropsError } from '../ErrorCustom'

export default class TipoGastoNoEncontrado extends Error implements ErrorCustom {
	StatusHttp: number = 404
	contenido?: any
	constructor({ contenido, mensaje = 'No encontramos  el tipo de gasto solicitado' }: PropsError) {
		super(mensaje)
		this.contenido = contenido
	}
}
