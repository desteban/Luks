import { Either } from '@/lib/Either'
import { ServerError } from '@/lib/Errors/ServerError'
import { ErroresTiposIngresos } from '@/lib/Errors/TiposIngresos/ErroresTipoIngresos'
import TipoIngresoNoEncontrado from '@/lib/Errors/TiposIngresos/TipoIngresoNoEncontrado'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { TiposIngresos } from '@prisma/client'

export default async function ObtenerTipoIngreso(
	tipoIngresoId: number,
): Promise<Either<ErroresTiposIngresos, TiposIngresos>> {
	let either = new Either<ErroresTiposIngresos, TiposIngresos>()

	try {
		const tipoIngreso = await prisma.tiposIngresos.findFirst({ where: { id: tipoIngresoId } })

		if (!tipoIngreso) {
			either.setError(new TipoIngresoNoEncontrado({}))
			return either
		}

		either.setRight(tipoIngreso)
	} catch (error) {
		const errorPrisma = MatchErroresPrisma(error)
		if (errorPrisma) {
			either.setError(errorPrisma)
			return either
		}

		either.setError(new ServerError({}))
	}

	return either
}
