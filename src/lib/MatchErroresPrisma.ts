import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ErroresPrisma } from './Errors/Prisma/ErroresPrisma'
import { ServerError } from './Errors/ServerError'
import { ErrorEstructuraDb } from './Errors/Prisma/ErrorEstructuraDb'
import { ConexionDbError } from './Errors/Prisma/ConexionDbError'

export default function MatchErroresPrisma(error: any): ErroresPrisma | null {
	//Error en la estructura de datos
	if (error instanceof PrismaClientKnownRequestError) {
		return new ErrorEstructuraDb({})
	}

	if (error instanceof PrismaClientInitializationError) {
		return new ConexionDbError({})
	}

	return null
	// return new ServerError({})
}
