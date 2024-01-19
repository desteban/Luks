"use client";

import ListadoUsuarios from "@/Services/ListadoUsuarios";
import { Nav } from "@/components/nav/Nav";
import { Usuario } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    async function Inicio() {
      const respuesta = await ListadoUsuarios();
      setUsuarios(respuesta.usuarios);
    }

    Inicio();
  }, []);
  return (
    <main>
      <Nav />
      <h1>Inicio</h1>
      <p>{JSON.stringify(usuarios)}</p>
    </main>
  );
}
