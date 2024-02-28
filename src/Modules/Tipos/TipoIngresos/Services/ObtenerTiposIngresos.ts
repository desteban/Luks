import { Either } from '@/lib/Either'
import { ServerError } from '@/lib/Errors/ServerError'
import { ErroresTiposIngresos } from '@/lib/Errors/TiposIngresos/ErroresTipoIngresos'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { TiposIngresos } from '@prisma/client'

/**
 * Buscar los primeros 10 tipos de ingresos en la base de datos
 * @returns un array con los primeros 10 tipos de ingresos
 */
export async function ObtenerPrimerosTiposIngresos(): Promise<Either<ErroresTiposIngresos, TiposIngresos[]>> {
	let either = new Either<ErroresTiposIngresos, TiposIngresos[]>()

	try {
		const tiposIngresos = await prisma.tiposIngresos.findMany({ take: 10 })
		either.setRight(tiposIngresos)
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
