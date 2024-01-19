import { UrlApi } from "@/lib/Globales";
import { Usuario } from "@prisma/client";

export interface RootListadoUsuarios {
  usuarios: Usuario[];
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}

export default async function ListadoUsuarios(): Promise<RootListadoUsuarios> {
  const respuesta = await fetch(`${UrlApi}usuarios`);
  const json: RootListadoUsuarios = await respuesta.json();
  return json;
}
