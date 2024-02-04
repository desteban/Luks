import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const CrearUsuarioSchema = z.object({
	id: z.string().uuid('El id debe ser un uuid').optional(),
	name: z.string().min(1, 'Debe contener por lo menos un carácter'),
	lastName: z.string().optional(),
	email: z.string({ errorMap: z.getErrorMap() }).email('El correo es necesario'),
	password: z
		.string({ errorMap: z.getErrorMap() })
		.min(8, { message: 'La contraseña debe tener por lo menos 8 caracteres' })
		.max(25, { message: 'La contraseña debe tener como máximo 25 caracteres' }),
	// nombreUsuario: z.string({ errorMap: z.getErrorMap() }).optional(),
})

export type CrearUsuarioTipo = z.infer<typeof CrearUsuarioSchema>
