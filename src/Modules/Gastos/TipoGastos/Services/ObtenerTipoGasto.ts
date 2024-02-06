import { Either } from '@/lib/Either'
import { ErroresTiposGastos } from '@/lib/Errors/TiposGastos/ErroresTiposGastos'
import TipoGastoNoEncontrado from '@/lib/Errors/TiposGastos/TipoGastoNoEncontrado'
import prisma from '@/lib/Prisma'
import { TiposGastos } from '@prisma/client'

export default async function ObtenerTipoGasto(tipoGastoId: number): Promise<Either<ErroresTiposGastos, TiposGastos>> {
	let either = new Either<ErroresTiposGastos, TiposGastos>()

	const tipo = await prisma.tiposGastos.findFirst({ where: { id: tipoGastoId } })
	if (!tipo) {
		either.setError(new TipoGastoNoEncontrado({}))
		return either
	}

	either.setRight(tipo)
	return either
}
