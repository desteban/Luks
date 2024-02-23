import { Either } from '@/lib/Either'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import { Ingresos } from '@prisma/client'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { IngresoNoEncontrado } from '../Errors/IngresoNoEncontrado'
import { IngresosUsuario } from './IngresosUsuario'

/**
 * Metodo para obtener un ingreso dependiendo del id del ingreso y del usuario
 * @param ingresoId Id del ingreso a buscar
 * @param userId Id del usuario para validar que el ingreso pertenece al usuario
 * @returns
 */
export default async function EncontrarIngreso(
	ingresoId: string,
	userId: string,
): Promise<Either<ErroresIngreso, IngresosUsuario>> {
	let either = new Either<ErroresIngreso, IngresosUsuario>()

	try {
		const ingreso = await prisma.ingresos.findFirst({
			select: {
				id: true,
				nombre: true,
				tipoIngresoId: true,
				valor: true,
				createdAt: true,
				tipo: { select: { id: true, imagen: true, nombre: true } },
			},
			where: { id: ingresoId, userId },
		})

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
