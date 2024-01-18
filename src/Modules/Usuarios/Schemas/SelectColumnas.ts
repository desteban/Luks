export interface ColumnasUsuario {
  id?: boolean;
  nombre?: boolean;
  apellido?: boolean;
  correo?: boolean;
  password?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
}

export function SelectColumnasUsuario(
  columnas?: ColumnasUsuario
): ColumnasUsuario {
  return {
    id: false,
    nombre: true,
    apellido: true,
    correo: true,
    password: false,
    createdAt: false,
    updatedAt: false,
    ...columnas,
  };
}
