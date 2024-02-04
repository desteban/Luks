export interface ColumnasUsuario {
	id?: boolean
	name?: boolean
	lastName?: boolean
	// username?: boolean
	email?: boolean
	image?: boolean
	password?: boolean
	// createdAt?: boolean
	// updatedAt?: boolean
}

export function SelectColumnasUsuario(columnas?: ColumnasUsuario): ColumnasUsuario {
	return {
		name: true,
		lastName: true,
		email: true,

		...columnas,
	}
}
