import { Either } from "@/lib/Either";
import { UsuarioDuplicado, UsuarioNoEncontrado } from "@/lib/Errors";
import { ErrorParseSchema } from "@/lib/Errors/ErrorParseSchema";
import { CrearUsuarioSchema } from "@/schemas/CrearUsuario.Schema";
import { EjecutarSchema } from "@/schemas/EjecutarSchema";
import { NextResponse } from "next/server";
import { CrearUsuarioService } from "./services/CrearUsuario.Service";

type Usuario = {
  nombre: string;
  correo: string;
};

export async function GET(req: Request, res: NextResponse) {
  const usuarios: [Usuario] = [{ nombre: "David", correo: "mail@mail.com" }];

  let either = new Either();

  try {
    if (2 + 2 === 4) {
      either.setError(new UsuarioDuplicado());
      throw new UsuarioDuplicado();
    }
  } catch (error) {
    // retornar un 404 si no se encuentra el usuario
    if (error instanceof UsuarioNoEncontrado) {
      return NextResponse.json(
        { mensaje: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (error instanceof UsuarioDuplicado) {
      return NextResponse.json(
        { mensaje: error.message },
        { status: error.StatusHttp }
      );
    }
  }

  return NextResponse.json(usuarios, { status: 200 });
}

export async function POST(req: Request) {
  const schema = CrearUsuarioSchema;
  const datosBody = await req.json();
  const datosValidados = EjecutarSchema(schema, datosBody);

  if (datosValidados.errors()) {
    const err = datosValidados.Error();

    //errores al validar los datos enviados por el usuario
    if (err instanceof ErrorParseSchema) {
      return NextResponse.json(
        {
          mensaje: err.message,
          data: err.contenido,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { mensaje: "Internal server error" },
      { status: 500 }
    );
  }

  const usuario = await CrearUsuarioService(datosValidados.Right());

  if (usuario.errors()) {
    return NextResponse.json(
      { mensaje: "Internal server error, error al crear un usuario" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    data: { mensaje: "Usuario registrado con éxito", data: usuario.Right() },
  });
}
