import { Either } from '@/lib/Either'
import { GastoNoEncontrado } from '@/lib/Errors/Gastos/GastoNoEncontrado'
import { ConexionDbError } from '@/lib/Errors/Prisma/ConexionDbError'
import { ServerError } from '@/lib/Errors/ServerError'
import { ErroresTiposGastos } from '@/lib/Errors/TiposGastos/ErroresTiposGastos'
import prisma from '@/lib/Prisma'
import { Gastos } from '@prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { GastoUsuario } from './GastosUsuario'

/**
 *
 * @param GastoId id del gasto a editar
 * @param userId id del usuario del gasto
 * @param valor Valor  que se quiere asignar al gasto. Si no se manda, se mantendrá el mismo nombre al gasto
 * @param tipoGastoId id del tipo de gasto a asignar. Si no se manda, se mantendrá el mismo nombre al gasto
 * @param nombre nombre  con el cual se va a identificar al gasto. Si no se manda, se mantendrá el mismo nombre al gasto
 * @returns Either con errores  o el gasto editado correctamente
 */
export default async function EditarGasto(
	GastoId: string,
	userId: string,
	valor?: number,
	tipoGastoId?: number,
	nombre?: string,
): Promise<Either<ErroresTiposGastos, Gastos>> {
	let either = new Either<ErroresTiposGastos, Gastos>()

	try {
		const gasto = await BuscarGasto(GastoId, userId)
		if (gasto.errors()) {
			either.setError(gasto.Error() as ErroresTiposGastos)
			return either
		}

		const gastoDb = gasto.Right()
		const gastoEditado = await prisma.gastos.update({
			where: { id: GastoId, userId },
			data: {
				nombre: nombre ?? gastoDb.nombre,
				valor: valor ?? gastoDb.valor,
				tipoGastoId: tipoGastoId ?? gastoDb.tipoGastoId,
			},
		})

		either.setRight(gastoEditado)
	} catch (error) {
		//mostrar error por consola
		console.log('[ERROR] EditarGasto > try', error)

		either.setError(new ServerError({}))

		if (error instanceof PrismaClientInitializationError) {
			either.setError(new ConexionDbError({}))
		}
	}

	return either
}

/**
 *
 * @param GastoId Id del gasto a buscar
 * @returns Either con errores  o el gasto encontrado en la base de datos
 */
export async function BuscarGasto(GastoId: string, userId: string): Promise<Either<ErroresTiposGastos, Gastos>> {
	let either = new Either<ErroresTiposGastos, Gastos>()

	try {
		const gasto = await prisma.gastos.findFirst({
			where: { id: GastoId, userId },
			select: {
				nombre: true,
				valor: true,
				createdAt: true,
				tipoGastoId: true,
				tipo: { select: { id: true, nombre: true, imagen: true } },
			},
		})
		if (!gasto) {
			either.setError(new GastoNoEncontrado({}))
			return either
		}

		either.setRight(gasto as unknown as Gastos)
	} catch (error) {
		either.setError(new ServerError({}))

		if (error instanceof PrismaClientInitializationError) {
			either.setError(new ConexionDbError({}))
		}
	}

	return either
}
