import { NextResponse } from "next/server";
import { EstadosCuenta } from "./services/EstadosCuenta.Service";
import { EstadoUsuario } from "@prisma/client";

export async function GET() {
  const listadoEstados: EstadoUsuario[] = await EstadosCuenta();

  return NextResponse.json(listadoEstados);
}
