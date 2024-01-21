import { ErrorCustom, PropsError } from "../ErrorCustom";

export class ErrorParseSchema extends Error implements ErrorCustom {
  readonly StatusHttp: number = 400;
  readonly contenido: any;

  constructor({
    contenido,
    mensaje = "El usuario no cuenta con una sesion valida",
  }: // statusHttp = 400,
  PropsError) {
    super(mensaje);
    this.name = "ErrorParseSchema";
    this.contenido = contenido;
  }
}
