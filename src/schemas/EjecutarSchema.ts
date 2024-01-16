import { Either } from "@/lib/Either";
import { ErrorParseSchema } from "@/lib/Errors/ErrorParseSchema";
import { ZodError, z } from "zod";

/**
 *
 * @param schema Schema a ejecutar
 * @param data datos a validar por el schema
 * Este método ejecuta cualquier esquema de zod
 */
export function EjecutarSchema(schema: z.Schema, data: object) {
  const either = new Either();

  try {
    const result = schema.parse(data);
    either.setRight(result);
  } catch (error) {
    if (error instanceof ZodError) {
      const errores = error.issues.map((issue) => ({
        mensaje: issue.message,
        key: issue.path[0],
      }));

      either.setError(
        new ErrorParseSchema(
          "Error al validar los datos para registrar el usuario",
          errores
        )
      );
    }
  }

  return either;
}
