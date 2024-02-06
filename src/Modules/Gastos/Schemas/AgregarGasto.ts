import { z } from 'zod'

export const AgregarGastoSchema = z.object({
	valor: z.number().min(1, 'El valor mínimo es de 1'),
	tipo: z.number(),
})

export type AgregarGastoTipo = z.infer<typeof AgregarGastoSchema>
