import { Either } from '@/lib/Either'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import { IngresosUsuario } from './IngresosUsuario'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'
import { ServerError } from '@/lib/Errors/ServerError'
import prisma from '@/lib/Prisma'
import EncontrarIngreso from './EncontrarIngreso'
import { EditarGastoTipo } from '@/Modules/Gastos/Schemas/EditarGasto'

interface props {
	ingresoId: string
	userId: string
	data: EditarGastoTipo
}

export default async function EditarIngreso({
	data: { tipo, valor, nombre },
	ingresoId,
	userId,
}: props): Promise<Either<ErroresIngreso, IngresosUsuario>> {
	let either = new Either<ErroresIngreso, IngresosUsuario>()

	try {
		const ingresoDb = await EncontrarIngreso(ingresoId, userId)

		//errores al leer el ingreso de la base de datos
		if (ingresoDb.errors()) {
			return ingresoDb
		}

		const ingresoActual = ingresoDb.Right()
		const ingresoActualizado = await prisma.ingresos.update({
			select: {
				id: true,
				nombre: true,
				tipoIngresoId: true,
				valor: true,
				createdAt: true,
				tipo: { select: { id: true, imagen: true, nombre: true } },
			},
			where: {
				id: ingresoId,
				userId,
			},
			data: {
				nombre: nombre ?? ingresoActual.nombre,
				tipoIngresoId: tipo ?? ingresoActual.tipoIngresoId,
				valor: valor ?? ingresoActual.valor,
			},
		})

		either.setRight(ingresoActualizado)
	} catch (error) {
		let errorPrisma = MatchErroresPrisma(error)
		if (errorPrisma) {
			either.setError(errorPrisma)
		} else {
			either.setError(new ServerError({ mensaje: 'Error al editar el ingreso' }))
		}
	}

	return either
}
