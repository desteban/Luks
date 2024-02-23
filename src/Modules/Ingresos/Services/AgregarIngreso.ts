import { Either } from '@/lib/Either'
import { AgregarIngresoTipo } from '../Schemas/AgregarIngresos'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import { Ingresos } from '@prisma/client'
import prisma from '@/lib/Prisma'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'

export default async function AgregarIngreso(
	userId: string,
	{ tipo, valor, id, nombre }: AgregarIngresoTipo,
): Promise<Either<ErroresIngreso, Ingresos>> {
	let either = new Either<ErroresIngreso, Ingresos>()

	try {
		const ingresoNuevo = await prisma.ingresos.create({ data: { valor, nombre, tipoIngresoId: tipo, userId } })
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
