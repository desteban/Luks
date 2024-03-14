import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'

interface data {}

function getLastDayOfMonth(year: number, month: number) {
	let date = new Date(year, month + 1, 0)
	return date.getDate()
}

export default async function GastosLineaDashboad(
	userId: string,
	cantidad: number,
): Promise<Either<GastosTipoError, any>> {
	let either = new Either<ErroresIngreso, any>()

	try {
		let gastos: any = {}
		let desde = new Date()

		for (let i = 0; i < cantidad; i++) {
			const hasta = new Date()
			hasta.setMonth(hasta.getMonth() - i)
			desde.setMonth(desde.getMonth() - 1)
			const key: string = `${desde.getFullYear()}-${desde.getMonth() + 1}`

			const data = await prisma.gastos.groupBy({
				by: ['userId'],
				_sum: { valor: true },
				where: {
					userId,
					createdAt: {
						gte: desde,
						lte: hasta,
					},
				},
			})

			gastos[key] = data[0]?._sum.valor || 0
		}

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
