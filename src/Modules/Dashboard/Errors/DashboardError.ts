import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'

export type DashboardError = GastosTipoError | ErroresIngreso
