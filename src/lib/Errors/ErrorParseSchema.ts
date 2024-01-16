import { ErrorCustom } from "./ErrorCustom";

export class ErrorParseSchema extends Error implements ErrorCustom {
  constructor(
    readonly mensaje: string = "Error al validar los datos",
    readonly contenido?: any
  ) {
    super(mensaje);
    this.name = "Datos erróneos";
  }

  getContenido() {
    return this.contenido;
  }
}
