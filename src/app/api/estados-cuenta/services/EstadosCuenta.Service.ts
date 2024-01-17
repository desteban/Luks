import { prisma } from "@/lib/Prisma";
import { EstadoUsuario } from "@prisma/client";

export async function EstadosCuenta(): Promise<EstadoUsuario[]> {
  const EstadosCuenta = prisma.estadoUsuario.findMany();

  return EstadosCuenta;
}
