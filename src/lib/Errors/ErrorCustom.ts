export interface ErrorCustom {
  readonly StatusHttp: number;
  readonly contenido?: any;
  name: string;
  message: string;
}

export interface PropsError {
  mensaje?: string;
  // statusHttp?: number;
  contenido?: any;
}
