import { ErrorCustom } from "../ErrorCustom";

export class UserNotFound extends Error implements ErrorCustom {
  constructor(readonly mensaje: string, readonly contenido?: any) {
    super(mensaje);

    this.name = "usuario no encontrado";
  }

  getContenido(): any {
    return this.contenido;
  }
}
