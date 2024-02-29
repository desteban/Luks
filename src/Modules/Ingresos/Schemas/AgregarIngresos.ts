import { z } from 'zod'

// const e = z.setErrorMap((error) => ({
// 	message: `El campo ${error.path[0]} debe ser un texto`,
// }))

export const AgregarIngresoSchema = z.object({
	id: z.string({ invalid_type_error: 'El id debe ser un string' }).uuid('El formato del id es incorrecto').optional(),
	valor: z.number({ invalid_type_error: 'Debe ingresar un valor' }).min(1, 'El valor mínimo es de 1'),
	nombre: z
		.string({ invalid_type_error: 'El nombre debe se un string' })
		.max(30, 'El nombre debe tener como máximo 30 caracteres')
		.optional(),
	tipo: z.number(),
})

export type AgregarIngresoTipo = z.infer<typeof AgregarIngresoSchema>
