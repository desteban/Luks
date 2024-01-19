import ListadoUsuarios, {
  RootListadoUsuarios,
} from "@/Services/ListadoUsuarios";
import { Tabla } from "@/components/Tabla";
import { Nav } from "@/components/nav/Nav";

export async function getData(): Promise<RootListadoUsuarios> {
  const respuesta = await ListadoUsuarios();
  return respuesta;
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <Nav />
      <h1>Inicio</h1>
      {JSON.stringify(data)}

      <Tabla />
    </main>
  );
}
