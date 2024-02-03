import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const ActuaizarUsuarioSchema = z.object({
	name: z.string().optional(),
	lastName: z.string().nullable().optional(),
	email: z.string({ errorMap: z.getErrorMap() }).email('El correo es necesario').optional(),
	// nombreUsuario: z.string({ errorMap: z.getErrorMap() }).nullable().optional(),
})

export type ActuaizarUsuarioType = z.infer<typeof ActuaizarUsuarioSchema>
