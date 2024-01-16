import { Either } from "@/lib/Either";
import { CrearUsuarioSchema } from "@/schemas/CrearUsuario.Schema";

/**
 *
 * @param data Datos para crear el usuario
 * @returns Promise<Either>
 */
export async function CrearUsuarioService(
  data: typeof CrearUsuarioSchema
): Promise<Either> {
  let either = new Either();

  either.setRight(data);

  return either;
}
