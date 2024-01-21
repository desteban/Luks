import { ErrorCustom, PropsError } from "../ErrorCustom";

export class UsuarioSinSession extends Error implements ErrorCustom {
  readonly StatusHttp: number = 403;
  readonly contenido: any;

  constructor({
    contenido,
    mensaje = "El usuario no cuenta con una sesion valida",
  }: PropsError) {
    super(mensaje);
    this.name = "UsuarioSinSession";
    this.contenido = contenido;
  }
}
