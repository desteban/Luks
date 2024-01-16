import { z } from "zod";

const e = z.setErrorMap((error) => ({
  message: `El campo ${error.path[0]} debe ser un texto`,
}));

export const CrearUsuarioSchema = z.object({
  correo: z
    .string({ errorMap: z.getErrorMap() })
    .email("El correo es necesario"),
  nombre: z.string(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener por lo menos 8 caracteres" })
    .optional(),
});
