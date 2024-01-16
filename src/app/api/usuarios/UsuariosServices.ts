import { Either } from "@/lib/Either";

type Usuario = {
  nombre: string;
  correo: string;
};

export function BuscarUsuarios(): Either {
  let either = new Either();

  const usuarios: Usuario[] = [
    { nombre: "David", correo: "mail@mail.com" },
    { correo: "email@mail.com", nombre: "Mi nombre" },
  ];

  return either;
}
