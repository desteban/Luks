import { Either } from "@/lib/Either";
import { UserDuplicated } from "@/lib/Errors/Usuarios/UserDuplicated";
import { Usuario } from "@prisma/client";
import { ObtenerUsuarioMinimoService } from "./ObtenerUsuario";
import { prisma } from "@/lib/Prisma";
import { SelectColumnasUsuario } from "../Schemas/SelectColumnas";

interface props {
  id?: string;
  nombre: string;
  apellido: string | null;
  nombreUsario?: string;
  estadoCuenta: number;
  correo: string;
  password: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export async function CrearUsuarioService(data: Usuario): Promise<Either> {
  let either = new Either();
  const usuarioExiste = await ObtenerUsuarioMinimoService(data);
  let datosUsuarioCrear: props = data;
  datosUsuarioCrear.estadoCuenta = 1;

  if (usuarioExiste) {
    if (
      usuarioExiste.id === data.id &&
      usuarioExiste.correo !== data.correo &&
      usuarioExiste.nombreUsuario !== data.nombreUsuario
    ) {
      delete datosUsuarioCrear.id;
      return await CrearUsuarioService({
        ...datosUsuarioCrear,
      } as Usuario);
    }

    either.setError(
      new UserDuplicated("Datos no validos para crear una cuenta")
    );
    return either;
  }

  const user = await prisma.usuario.create({
    data,
    select: SelectColumnasUsuario(),
  });
  either.setRight(user);
  return either;
}
