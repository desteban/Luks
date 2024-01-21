import { ErrorCustom, PropsError } from "../ErrorCustom";

export class UserDuplicated extends Error implements ErrorCustom {
  readonly StatusHttp: number = 409;
  readonly contenido: any;

  constructor({
    contenido,
    mensaje = "El usuario no cuenta con una sesión valida",
  }: PropsError) {
    super(mensaje);
    this.name = "UserDuplicated";
    this.contenido = contenido;
  }
}
