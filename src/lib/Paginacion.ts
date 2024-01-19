import { NextRequest } from "next/server";

interface props {
  schema: any;
}

interface ParamsPaginacion {
  pagina: number;
  porPagina: number;
}

export function ObtenerParamsPaginacion(req: NextRequest): ParamsPaginacion {
  const params = req.nextUrl.searchParams;

  const datos: ParamsPaginacion = {
    pagina: +(params.get("pagina") ?? 0) - 1,
    porPagina: +(params.get("porPagina") ?? 30),
  };

  if (datos.pagina < 0) {
    datos.pagina = 0;
  }

  return datos;
}

export function Paginacion({ schema }: props) {
  schema;
}
