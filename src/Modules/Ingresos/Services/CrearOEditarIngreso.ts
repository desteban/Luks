import { Either } from '@/lib/Either'
import { Ingresos } from '@prisma/client'
import { ErroresIngreso } from '../Errors/ErroresIngreso'
import EncontrarIngreso from './EncontrarIngreso'
import { IngresoNoEncontrado } from '../Errors/IngresoNoEncontrado'
import { ServerError } from '@/lib/Errors/ServerError'
import prisma from '@/lib/Prisma'
import MatchErroresPrisma from '@/lib/MatchErroresPrisma'

export default async function CrearOEditarIngreso(ingreso: Ingresos): Promise<Either<ErroresIngreso, Ingresos>> {
	const { id } = ingreso

	const ingresoDb = await EncontrarIngreso(id)
	//validar si no se  encontró el ingreso a buscar
	if (ingresoDb.Error() && ingresoDb.Error() instanceof IngresoNoEncontrado) {
		//Crear ingreso
		return await CrearIngreso(ingreso)
	}

	if (ingresoDb.errors()) {
		return ingresoDb
	}

	//editar ingreso
	const ingresoEditado = await EditarIngreso(ingresoDb.Right(), ingreso)
	return ingresoEditado
}

async function CrearIngreso(ingreso: Ingresos): Promise<Either<ErroresIngreso, Ingresos>> {
	let either = new Either<ErroresIngreso, Ingresos>()

	try {
		const ingresoNuevo = await prisma.ingresos.create({ data: ingreso })
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

/**
 *
 * @param ingresoDb Ingreso recuperado de la base de datos
 * @param ingreso datos que se quieren actualizar
 */
async function EditarIngreso(ingresoDb: Ingresos, ingreso: Ingresos): Promise<Either<ErroresIngreso, Ingresos>> {
	let either = new Either<ErroresIngreso, Ingresos>()

	try {
		const ingresoEditado = await prisma.ingresos.update({
			where: { id: ingresoDb.id },
			data: { ...ingresoDb, ...ingreso },
		})
		either.setRight(ingresoEditado)
	} catch (error) {
		either.setError(new ServerError({}))

		const erroresPrisma = MatchErroresPrisma(error)
		if (erroresPrisma) either.setError(erroresPrisma)
	}

	return either
}
