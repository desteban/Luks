import { ErrorCustom } from "./ErrorCustom";

export class ErrorParseSchema extends Error implements ErrorCustom {
  readonly codigoHttp: number;

  constructor(
    readonly mensaje: string = "Error al validar los datos",
    readonly contenido?: any,
    readonly StatusHttp: number = 409
  ) {
    super(mensaje);
    this.name = "Datos erróneos";
    this.codigoHttp = 400;
  }

  getContenido() {
    return this.contenido;
  }
}
