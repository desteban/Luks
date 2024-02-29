import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import prisma from '@/lib/Prisma'
import { Decimal, PrismaClientInitializationError } from '@prisma/client/runtime/library'

export interface GastoUsuario {
	id?: string
	valor: Decimal | string
	nombre?: string | null
	tipoGastoId: number
	createdAt: Date
	tipo: {
		id: number
		imagen: string
		nombre: string
	}
}

/**
 *
 * @param userId id del usuario del que se desea obtener los gastos
 * @param pagina pagina que se quiere visualizar de los gastos
 * @param porPagina Cantidad de registros por pagina
 * @returns Promise<Either<GastosTipoError, GastoUsuario[]>>
 */
export async function GastosUsuario(
	userId: string,
	pagina: number = 0,
	porPagina: number = 20,
): Promise<Either<GastosTipoError, GastoUsuario[]>> {
	const either = new Either<GastosTipoError, GastoUsuario[]>()

	try {
		const listadoGastos = await prisma.gastos.findMany({
			select: {
				id: true,
				valor: true,
				tipoGastoId: true,
				createdAt: true,
				nombre: true,
				tipo: { select: { id: true, imagen: true, nombre: true } },
			},
			where: { userId: userId },
			take: porPagina,
			skip: pagina > 0 ? pagina * porPagina : pagina,
			orderBy: {
				createdAt: 'desc',
			},
		})
		either.setRight(listadoGastos)
	} catch (error) {
		either.setError(new ServerError({}))

		if (error instanceof PrismaClientInitializationError) {
			either.setError(new ConexionDbError({}))
		}
	}

	return either
}
