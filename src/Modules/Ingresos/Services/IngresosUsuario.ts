import { Either } from '@/lib/Either'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import { Ingresos } from '@prisma/client'
import prisma from '@/lib/Prisma'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import { Decimal } from '@prisma/client/runtime/library'

type Paginacion = {
	pagina: number
	porPagina: number
	totalPaginas: number
	total: number
	ingresos: IngresosUsuario[]
}

export interface IngresosUsuario {
	id: string
	valor: Decimal | string
	nombre: string | null
	tipoIngresoId: number
	createdAt: Date
	tipo: {
		id: number
		nombre: string
		imagen: string
	}
}

/**
 * Obtener los ingresos de un usuario especifico
 * @param userId Id del usuario
 * @param pagina Hoja de la que queremos obtener la información
 * @param tomar Cantidad de registros a tomar
 * @returns
 */
export async function IngresosDelUsuario(
	userId: string,
	pagina: number,
	tomar: number,
): Promise<Either<ErroresIngreso, Paginacion>> {
	let either = new Either<ErroresIngreso, Paginacion>()

	try {
		const totalIngresos = await prisma.ingresos.count({ where: { userId } })
		const totalPaginas = Math.round(totalIngresos / tomar)
		const listado = await prisma.ingresos.findMany({
			select: {
				id: true,
				nombre: true,
				tipoIngresoId: true,
				valor: true,
				createdAt: true,
				tipo: { select: { id: true, imagen: true, nombre: true } },
			},
			where: { userId },
			take: tomar,
			skip: pagina > 0 ? pagina * tomar : pagina,
			orderBy: {
				createdAt: 'desc',
			},
		})

		either.setRight({
			pagina: pagina + 1,
			porPagina: tomar,
			totalPaginas: totalPaginas === 0 ? 1 : totalPaginas,
			total: totalIngresos,
			ingresos: listado,
		})
	} catch (error) {
		either.setError(new ServerError({}))

		const erroresPrisma = MatchErroresPrisma(error)
		if (erroresPrisma) {
			either.setError(erroresPrisma)
		}
	}

	return either
}
