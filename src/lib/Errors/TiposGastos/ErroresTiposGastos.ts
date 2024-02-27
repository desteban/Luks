import { ServerError } from '../ServerError'
import { ServicioNoDisponible } from '../ServicioNoDisponible'
import TipoGastoNoEncontrado from './TipoGastoNoEncontrado'

export type ErroresTiposGastos = TipoGastoNoEncontrado | ServerError | ServicioNoDisponible
