import { ErrorCustom } from "./Errors/ErrorCustom";

export class Either {
  private right: any | null | undefined;
  private error: Error | null | undefined;

  constructor() {
    this.error = undefined;
    this.right = null;
  }

  public Error(): Error | false {
    return this.error ?? false;
  }

  /**
   *
   * @returns true si tiene errores el either false si el either no cuenta con errores
   */
  public errors(): boolean {
    return this.error ? true : false;
  }

  /**
   * @param error Error a agregar
   * agrega un tipo de error al either
   */
  public setError(error: Error): void {
    this.error = error;
  }

  /**
   *Este método agrega una respuesta correcta siempre que no se tengan registrados errores
   * @param data Datos correctos de la tarea
   */
  public setRight(data: any): void {
    if (this.errors()) {
      return;
    }

    this.right = data;
  }

  public Right(): any | null {
    return this.right ?? null;
  }
}
