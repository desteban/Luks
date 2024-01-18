export interface ErrorCustom {
  mensaje: string;
  getContenido(): any;
  StatusHttp: number;
}
