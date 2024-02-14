import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const AgregarIngresoSchema = z.object({
	valor: z.number().min(1, 'El valor mínimo es de 1'),
	nombre: z.string().max(30, 'El nombre debe tener como máximo 30 caracteres').optional(),
	tipo: z.number(),
})

export type AgregarIngresoTipo = z.infer<typeof AgregarIngresoSchema>
