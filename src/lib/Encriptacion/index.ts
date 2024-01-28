import { env } from 'process'
import { Either } from '../Either'
import { ErroresEncriptacion } from './ErroresEncriptacion'
import ErrorHash from './ErrorHash'

// import * as Bcrypt from 'bcrypt'
const bcrypt = require('bcrypt')
const saltRounds: number = +(env.SALTOS ?? 10)

export async function Encriptar(cadena: string) {
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

export function Comparar(cadena: string, hash: string): boolean {
	let valido: boolean = false

	bcrypt.compare(cadena, hash, function (err: Error | any, result: boolean) {
		if (result) {
			valido = true
		}
	})

	return valido
}
