import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'

interface data {}

/**
 * Obtener el total de los ingresos del usuario en el mes actual
 * @param userId Id del usuario para buscar los gastos
 * @returns Either<GastosTipoError, number>
 */
export default async function TotalIngresosUsuarioDashboard(userId: string): Promise<Either<ErroresIngreso, number>> {
	let either = new Either<GastosTipoError, any>()

	const fechaActual = new Date()
	const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
	const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0)

	try {
		const total = await prisma.ingresos.groupBy({
			by: 'userId',
			_sum: { valor: true },
			where: {
				userId,
				createdAt: {
					gte: primerDiaMesActual,
					lt: fechaActual,
				},
			},
		})

		either.setRight(total[0]._sum?.valor || 0)
	} catch (error) {
		const errorPrisma = MatchErroresPrisma(error)
		if (errorPrisma) {
			either.setError(errorPrisma)
		} else {
			either.setError(new ServerError({}))
		}
	}

	return either
}
