import { env } from 'process'
import { Either } from '../Either'
import { ErroresEncriptacion } from './ErroresEncriptacion'
import ErrorHash from './ErrorHash'
import ErrorCompararHash from './ErrorCompararHash'

import * as bcrypt from 'bcrypt'
// const bcrypt = require('bcrypt')
const saltRounds: number = +(env.SALTOS ?? 10)

export async function Encriptar(cadena: string): Promise<Either<ErroresEncriptacion, string>> {
	const either = new Either<ErroresEncriptacion, string>()
	try {
		let hash = await bcrypt.hash(cadena, saltRounds)
		either.setRight(hash)
		return either
	} catch (error) {
		either.setError(new ErrorHash())
		return either
	}
}

export async function CompararHash(cadena: string, hash: string): Promise<Either<ErrorCompararHash, boolean>> {
	let either = new Either<ErrorCompararHash, boolean>()

	try {
		let validado = await bcrypt.compare(cadena, hash)
		either.setRight(validado as boolean)
	} catch (error) {
		either.setError(new ErrorCompararHash())
	}

	return either
}
