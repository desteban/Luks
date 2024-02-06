import { Either } from '@/lib/Either'
import { CrearActualizarGastoError } from '@/lib/Errors/Gastos/CrearActualizarGastoError'
import { GastosTipoError } from '@/lib/Errors/Gastos/GastosTipoError'
import { ServerError } from '@/lib/Errors/ServerError'
import prisma from '@/lib/Prisma'
import { Gastos, TiposGastos, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

interface props {
	tipoGasto: TiposGastos
	usuario: User
	valor: number
}

export default async function AgregarGasto({
	tipoGasto,
	usuario,
	valor,
}: props): Promise<Either<GastosTipoError, Gastos>> {
	let either = new Either<GastosTipoError, Gastos>()

	try {
		let gasto = await prisma.gastos.create({
			data: {
				valor,
				userId: usuario.id,
				tipoGastoId: tipoGasto.id,
			},
		})
		either.setRight(gasto)
	} catch (error) {
		//error en la estructura  de los datos
		if (error instanceof PrismaClientKnownRequestError) {
			either.setError(new CrearActualizarGastoError({ contenido: error.meta ?? [] }))
			return either
		}

		either.setError(new ServerError({}))
	}

	return either
}
