export interface ColumnasUsuario {
	id?: boolean
	nombre?: boolean
	apellido?: boolean
	nombreUsuario?: boolean
	correo?: boolean
	correoGoogle?: boolean
	password?: boolean
	createdAt?: boolean
	updatedAt?: boolean
}

export function SelectColumnasUsuario(columnas?: ColumnasUsuario): ColumnasUsuario {
	return {
		nombre: true,
		apellido: true,
		correo: true,

		...columnas,
	}
}
