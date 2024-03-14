import { Either } from '@/lib/Either'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import prisma from '@/lib/Prisma'
import { Decimal } from '@prisma/client/runtime/library'
import { RegistroGraficaRadar } from '../../../..'

/**
 * Obtiene como máximo 6 de los gastos mas comunes en el mes actual
 * @param userId Id del usuario para buscar los gastos
 * @returns Either<GastosTipoError, RegistroGraficaRadar[]>
 */
export default async function TotalGastosUsuarioDashboard(
	userId: string,
): Promise<Either<GastosTipoError, RegistroGraficaRadar[]>> {
	let either = new Either<GastosTipoError, any>()

	const fechaActual = new Date()
	const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)

	try {
		const [res] = await prisma.$transaction([
			prisma.$queryRaw`select tg.nombre as "tema", sum(g.valor) as "valor"
			from public."Gastos" as g
			inner join public."TiposGastos" as tg on g."tipoGastoId"  = tg.id
			where g."userId" = ${userId}
			and g."createdAt" >= ${primerDiaMesActual}
			group by g."tipoGastoId" , tg.nombre
			order by valor desc
			limit 6;`,
		])
		either.setRight(res || [])
	} catch (error) {
		const errorPrisma = MatchErroresPrisma(error)
		if (errorPrisma) {
			either.setError(errorPrisma)
		} else {
			either.setError(new ServerError({}))
		}
	}

	return either
}
