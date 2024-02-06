import { ErrorParseSchema, UserNotFound, UsuarioSinSession } from '..'
import { ServerError } from '../ServerError'
import { ErroresTiposGastos } from '../TiposGastos/ErroresTiposGastos'
import { CrearActualizarGastoError } from './CrearActualizarGastoError'
import { GastoNoEncontrado } from './GastoNoEncontrado'

export type GastosTipoError =
	| ServerError
	| GastoNoEncontrado
	| ErrorParseSchema
	| UsuarioSinSession
	| CrearActualizarGastoError
	| UserNotFound
	| ErroresTiposGastos
