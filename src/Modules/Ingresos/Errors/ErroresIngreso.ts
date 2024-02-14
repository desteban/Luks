import { ErroresPrisma } from '@/lib/Errors/Prisma/ErroresPrisma'
import { IngresoNoEncontrado } from './IngresoNoEncontrado'
import { ServerError } from '@/lib/Errors/ServerError'
import { CrearActualizarIngresoError } from './CrearActualizarIngresoError'

export type ErroresIngreso = ErroresPrisma | ServerError | IngresoNoEncontrado | CrearActualizarIngresoError
