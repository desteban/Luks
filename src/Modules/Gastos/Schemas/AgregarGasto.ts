import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const AgregarGastoSchema = z.object({
	valor: z.number().min(1, 'El valor mínimo es de 1'),
	nombre: z.string().optional(),
	tipo: z.number(),
})

export type AgregarGastoTipo = z.infer<typeof AgregarGastoSchema>
