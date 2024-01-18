"use client";

import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import Input from "@/components/Input/Inputs";
import estilos from "./estilos.module.css";
import { Button } from "@/components/ui/button";
import Password from "@/components/Input/Password";
import Link from "next/link";
import GoogleIcon from "../../../public/iconos/GoogleIcon";
import { signIn } from "next-auth/react";

// h-screen w-screen flex-md items-md-center justify-md-center
export default function Page() {
  return (
    <main className={estilos.contenedor}>
      <Card className={`${estilos.contenido} bg-gray-50`}>
        <div className="">
          <h1 className="text-center mb-5">Regístrate</h1>

          <CardBody>
            <form className="mb-3">
              <div className="campo-doble-adaptable">
                <Input
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  placeHolder="Nombre"
                  required
                />

                <Input
                  id="apellido"
                  label="Apellido"
                  placeHolder="Apellido"
                  name="apellido"
                />
              </div>

              <Input
                id="correo"
                name="correo"
                label="Correo"
                placeHolder="Correo"
                className="mb-5"
                required
              />

              <Input
                id="usuario"
                name="usuario"
                label="Nombre de usuario"
                placeHolder="Nombre de usuario"
                className="mb-5"
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

            <Link href={"/login"} className="text-sm">
              ¿Ya tienes una cuenta?, Inicia sesión
            </Link>

            <div className={estilos.botones}>
              <GoogleIcon
                size={32}
                className="cursor-pointer"
                onClick={() => signIn("google")}
              />
            </div>
          </CardBody>
        </div>
      </Card>
    </main>
  );
}
