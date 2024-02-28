import { Either } from '@/lib/Either'
import { ErroresTiposGastos } from '@/lib/Errors/TiposGastos/ErroresTiposGastos'
import { ServerError } from '@/lib/Errors/ServerError'
import prisma from '@/lib/Prisma'
import { TiposGastos } from '@prisma/client'

/**
 * Obtener los primeros 10 Tipos de gastos
 */
export async function ObtenerPrimerosTiposGastos(): Promise<Either<ErroresTiposGastos, TiposGastos[]>> {
	const either = new Either<ErroresTiposGastos, TiposGastos[]>()

	try {
		const tiposGastos = await prisma.tiposGastos.findMany({ take: 10 })
		either.setRight(tiposGastos)
	} catch (error) {
		either.setError(new ServerError({}))
	}

	return either
}

export async function ObtenerOtrosTiposGastos(): Promise<Either<ErroresTiposGastos, TiposGastos[]>> {
	const either = new Either<ErroresTiposGastos, TiposGastos[]>()

	try {
		const tiposGastos = await prisma.tiposGastos.findMany({ skip: 10 })
		either.setRight(tiposGastos)
	} catch (error) {
		either.setError(new ServerError({}))
	}

	return either
}
