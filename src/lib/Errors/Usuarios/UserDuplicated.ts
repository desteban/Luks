import { ErrorCustom } from "../ErrorCustom";

export class UserDuplicated extends Error implements ErrorCustom {
  readonly StatusHttp: number = 409;

  constructor(
    readonly mensaje: string = "El usuario no es valido",
    readonly contenido?: any
  ) {
    super(mensaje);
    this.name = "Usuario duplicado";
  }

  getContenido() {
    return this.contenido;
  }
}
