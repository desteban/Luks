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
    nombre: true,
    apellido: true,
    correo: true,
    ...columnas,
  };
}
