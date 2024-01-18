import { NextResponse } from "next/server";

interface props {
  config?: ResponseInit;
  data?: any;
}

export function RespuestaJson({ config = { status: 200 }, data }: props) {
  return NextResponse.json(data, config);
}

interface propsError {
  respuesta: {
    data?: any;
    mensaje: string;
  };
  config?: ResponseInit;
}

export function RespuestaJsonError({
  respuesta,
  config = { status: 400 },
}: propsError) {
  return NextResponse.json(respuesta, config);
}
