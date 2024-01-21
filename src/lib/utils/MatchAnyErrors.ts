import { RespuestaJsonError } from "../RespuestaJson";
import { ErrorCustom } from "../Errors/ErrorCustom";
import { ErrorParseSchema } from "../Errors";

export function MatchAnyErrors(error: ErrorCustom) {
  try {
    if (error instanceof ErrorParseSchema) {
      return RespuestaJsonError({
        config: { status: error.StatusHttp },
        respuesta: {
          mensaje: error.message,
          data: error.contenido,
        },
      });
    }

    return RespuestaJsonError({
      config: { status: error.StatusHttp },
      respuesta: {
        mensaje: error.message,
        data: { name: error.name },
      },
    });
  } catch (err) {
    return err;
  }
}
