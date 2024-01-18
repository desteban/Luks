import { ErrorParseSchema } from "@/lib/Errors/ErrorParseSchema";
import { UserDuplicated } from "@/lib/Errors/Usuarios/UserDuplicated";
import ObtenerDatosRquest from "@/lib/ObtenerDatosRquest";
import { CrearUsuarioSchema } from "@/Modules/Usuarios/Schemas/CrearUsuario.Schema";
import { EjecutarSchema } from "@/lib/EjecutarSchema";
import { NextRequest, NextResponse } from "next/server";
import { RespuestaJson } from "@/lib/RespuestaJson";
import { CrearUsuarioService } from "@/Modules/Usuarios/Services/CrearUsuario.Service";
import { ObtenerUsuariosService } from "@/Modules/Usuarios/Services/ObtenerUsuarios";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const porPagina: number = +(params.get("porPagina") ?? 30);
  let pagina: number = +(params.get("pagina") ?? 0) - 1;

  if (pagina < 0) {
    pagina = 0;
  }

  const usuarios = await ObtenerUsuariosService({
    porPagina: porPagina,
    pagina,
  });
  return RespuestaJson({ data: usuarios });
}

export async function POST(req: Request) {
  const schema = CrearUsuarioSchema;
  const datosBody = await ObtenerDatosRquest({ req });
  const validador = EjecutarSchema(schema, datosBody);

  if (validador.errors() && validador.Error()) {
    return MatchError(validador.Error() as Error);
  }

  let datosValidados = validador.Right();
  const usuarioNuevo = await CrearUsuarioService(datosValidados);

  if (usuarioNuevo.errors()) {
    return MatchError(usuarioNuevo.Error() as Error);
  }

  delete usuarioNuevo.Right().id;
  // delete usuarioNuevo.Right().password;
  return RespuestaJson({ data: usuarioNuevo.Right() });
}

function MatchError(error: Error) {
  //errores al validar los datos enviados por el usuario
  if (error instanceof ErrorParseSchema) {
    return NextResponse.json(
      {
        mensaje: error.message,
        data: error.contenido,
      },
      { status: 400 }
    );
  }

  if (error instanceof UserDuplicated) {
    return NextResponse.json(
      {
        mensaje: error.message,
        data: error.contenido,
      },
      { status: error.StatusHttp }
    );
  }

  return NextResponse.json(
    { mensaje: "Internal server error, algo pasó" },
    { status: 500 }
  );
}
