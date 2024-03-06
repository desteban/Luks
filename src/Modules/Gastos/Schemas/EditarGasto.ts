import { z } from 'zod'

const e = z.setErrorMap((error) => ({
	message: `El campo ${error.path[0]} debe ser un texto`,
}))

export const EditarGastoSchema = z.object({
	valor: z.number({ invalid_type_error: 'Debe ingresar un numero' }).min(1, 'El valor mínimo es de 1'),
	nombre: z
		.string({ invalid_type_error: 'El nombre debe ser un texto' })
		.max(50, 'El nombre debe tener como máximo 50 caracteres')
		.optional(),
	tipo: z.number({ invalid_type_error: 'Debe elegir un tipo de gasto' }),
})

export type EditarGastoTipo = z.infer<typeof EditarGastoSchema>
