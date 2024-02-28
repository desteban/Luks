import { ErroresPrisma } from '../Prisma/ErroresPrisma'
import TipoIngresoNoEncontrado from './TipoIngresoNoEncontrado'

export type ErroresTiposIngresos = TipoIngresoNoEncontrado | ErroresPrisma
