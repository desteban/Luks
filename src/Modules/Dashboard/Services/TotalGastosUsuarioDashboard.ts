import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'

interface data {}

export default async function TotalGastosUsuarioDashboard(userId: string): Promise<Either<GastosTipoError, any>> {
	let either = new Either<GastosTipoError, any>()

	const fechaActual = new Date()
	const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
	const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0)

	try {
		const total = await prisma.gastos.groupBy({
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
		either.setRight(total)
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
