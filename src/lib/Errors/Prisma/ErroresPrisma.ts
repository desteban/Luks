import { ServerError } from '../ServerError'
import { ConexionDbError } from './ConexionDbError'
import { ErrorEstructuraDb } from './ErrorEstructuraDb'

export type ErroresPrisma = ConexionDbError | ServerError | ErrorEstructuraDb
