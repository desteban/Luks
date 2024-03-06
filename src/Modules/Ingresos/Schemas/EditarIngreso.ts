import { z } from 'zod'

export const EditarIngresoSchema = z.object({
	valor: z.number({ invalid_type_error: 'Debe ingresar un valor' }).min(1, 'El valor mínimo es de 1'),
	nombre: z
		.string({ invalid_type_error: 'El nombre debe se un string' })
		.max(50, 'El nombre debe tener como máximo 50 caracteres')
		.optional(),
	tipo: z.number({ invalid_type_error: 'El tipo debe ser un numero' }),
})

export type EditarIngresoTipo = z.infer<typeof EditarIngresoSchema>
