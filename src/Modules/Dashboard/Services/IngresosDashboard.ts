import { ErroresIngreso } from '@/Modules/Ingresos/Errors/ErroresIngreso'
import { Either } from '@/lib/Either'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { Ingresos, User } from '@prisma/client'

interface data {}

export default async function IngresosDashboard(userId: string): Promise<Either<ErroresIngreso, any>> {
	let either = new Either<ErroresIngreso, any>()
	let desde = new Date()
	desde.setMonth(desde.getMonth() - 3)

	try {
		const ingresoNuevo = await prisma.ingresos.findMany({
			where: {
				userId,
				createdAt: {
					gte: desde,
				},
			},
		})
		either.setRight(ingresoNuevo)
	} catch (error) {
		either.setError(new ServerError({}))

		const erroresPrisma = MatchErroresPrisma(error)
		if (erroresPrisma) {
			either.setError(erroresPrisma)
		}
	}

	return either
}
