import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import Input from "@/components/Input/Inputs";
import estilos from "./estilos.module.css";

// h-screen w-screen flex-md items-md-center justify-md-center
export default function Page() {
  return (
    <main className={estilos.contenedor}>
      <Card className={estilos.contenido}>
        <div className="">
          <h1 className="text-center">Regístrate</h1>

          <CardBody>
            <form>
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
              />
            </form>
          </CardBody>
        </div>
      </Card>
    </main>
  );
}
