import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const ActuaizarUsuarioSchema = z.object({
	nombre: z.string().optional(),
	apellido: z.string().optional(),
	correo: z.string({ errorMap: z.getErrorMap() }).email('El correo es necesario').optional(),
	nombreUsuario: z.string({ errorMap: z.getErrorMap() }).optional(),
})

export type ActuaizarUsuarioType = z.infer<typeof ActuaizarUsuarioSchema>
