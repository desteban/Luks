<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

final class Respuesta
{
    /**
     * @param int $statusHttp codigo http de la respuesta
     * @param string $mensaje
     * @param mixed $data datos que dan respuesta a la petición
     * @param array|null $headers headers de la respuesta
     */
    public function __construct(protected int $statusHttp = 200, protected string $mensaje = '', protected $data = [], protected array|null $headers = [])
    {
    }

    public function cambiarRespuesta(int $statusHttp, string $mensaje = '', $data = [])
    {

        $this->statusHttp = $statusHttp;
        $this->mensaje = $mensaje;
        $this->data = $data;
    }

    public function responder(): \Response|JsonResponse
    {
        return response()->json($this, $this->statusHttp, $this->headers);
    }

    /**
     * @param int $statusHttp codigo http de la respuesta
     * @param string $mensaje
     * @param mixed $data datos que dan respuesta a la petición
     * @param array|null $headers headers de la respuesta
     */
    public static function respuesta(int $statusHttp, string $mensaje, $data = [], array|null $headers = []): \Response|JsonResponse
    {
        $contenidoRespuesta = [
            'status' => $statusHttp,
            'mensaje' => $mensaje,
        ];

        if (!empty($data)) {
            $contenidoRespuesta['data'] = $data;
        }


        return response()->json($contenidoRespuesta, $statusHttp, $headers);
    }
}
