import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import Input from "@/components/Input/Inputs";
import estilos from "../registro/estilos.module.css";
import { Button } from "@/components/ui/button";
import Password from "@/components/Input/Password";
import Link from "next/link";
import IniciarConGoogle from "@/components/Botones/IniciarConGoogle";

// h-screen w-screen flex-md items-md-center justify-md-center
export default function Page() {
  return (
    <main className={estilos.contenedor}>
      <Card className={`${estilos.contenido} bg-gray-50`}>
        <div className="">
          <h1 className="text-center mb-5">Regístrate</h1>

          <CardBody>
            <form className="mb-3">
              <Input
                id="correo"
                name="correo"
                label="Correo"
                placeHolder="Correo"
                className="mb-5"
                required
              />

              <Password
                id="password"
                label="Contraseña"
                name="password"
                placeHolder="Contraseña"
                className="mb-2"
                required
              />

              <Button className="mt-4 w-full">Crear</Button>
            </form>

            <Link href={"/registro"} className="text-sm">
              ¿No tienes una cuenta?, regístrate
            </Link>

            <div className={estilos.botones}>
              <IniciarConGoogle />
            </div>
            <p className="text-right text-sm mt-4">
              <Link href={"/"}>Regresar al inicio</Link>
            </p>
          </CardBody>
        </div>
      </Card>
    </main>
  );
}
