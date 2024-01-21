import { prisma } from "@/lib/Prisma";
import {
  ColumnasUsuario,
  SelectColumnasUsuario,
} from "../Schemas/SelectColumnas";

interface props {
  pagina: number;
  porPagina: number;
  select?: ColumnasUsuario;
}

export async function ObtenerUsuariosService({
  pagina,
  porPagina,
  select = SelectColumnasUsuario(),
}: props) {
  return await prisma.usuario.findMany({
    select: SelectColumnasUsuario(select),
    take: porPagina,
    skip: pagina,
  });
}

export async function CantidadTotalUsuarios(): Promise<number> {
  return (await prisma.usuario.count()) ?? 0;
}
