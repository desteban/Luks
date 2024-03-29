import { ErrorCustom, PropsError } from "../ErrorCustom";

export class UserNotFound extends Error implements ErrorCustom {
  readonly StatusHttp: number = 404;
  readonly contenido: any;

  constructor({
    contenido,
    mensaje = "El usuario no cuenta con una sesion valida",
  }: PropsError) {
    super(mensaje);
    this.name = "UserNotFound";
    this.contenido = contenido;
  }
}
