import { Either } from '@/lib/Either'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import { Ingresos } from '@prisma/client'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { IngresoNoEncontrado } from '../Errors/IngresoNoEncontrado'

export default async function EncontrarIngreso(ingresoId: string): Promise<Either<ErroresIngreso, Ingresos>> {
	let either = new Either<ErroresIngreso, Ingresos>()

	try {
		const ingreso = await prisma.ingresos.findFirst({ where: { id: ingresoId } })

		if (!ingreso) {
			either.setError(new IngresoNoEncontrado({}))
			return either
		}

		either.setRight(ingreso)
	} catch (error) {
		either.setError(new ServerError({}))

		const ErrorPrisma = MatchErroresPrisma(error)
		if (ErrorPrisma) {
			either.setError(ErrorPrisma)
		}
	}

	return either
}
