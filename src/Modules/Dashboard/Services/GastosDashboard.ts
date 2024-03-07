import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'

interface data {}

export default async function GastosDashboard(userId: string, desde: Date): Promise<Either<GastosTipoError, any>> {
	let either = new Either<ErroresIngreso, any>()

	try {
		// const gastos = await prisma.gastos.findMany({
		// 	where: {
		// 		userId,
		// 		createdAt: {
		// 			gte: desde,
		// 		},
		// 	},
		//     select: {
		//         valor: true,
		//     }
		// })
		const gastos = await prisma.gastos.groupBy({
			by: ['id'],
			_sum: {
				valor: true,
			},
			where: {
				userId,
				createdAt: {
					gte: desde,
				},
			},
		})
		either.setRight(gastos)
	} catch (error) {
		either.setError(new ServerError({}))

		const erroresPrisma = MatchErroresPrisma(error)
		if (erroresPrisma) {
			either.setError(erroresPrisma)
		}
	}

	return either
}
