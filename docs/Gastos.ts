/**
 * @api {get} gastos/ Listado con todos los gastos del usuario
 * @apiName ListadoGastos
 * @apiGroup Gastos
 *
 * @apiQuery {number} [pagina=1] Pagina que se desea visualizar los datos
 * @apiQuery {number} [porPagina=30] Datos a mostrar por pagina
 *
 *
 * @apiSuccess {number} pagina Pagina  actual
 * @apiSuccess {number} porPagina Cantidad de datos por pagina
 * @apiSuccess {number} totalPaginas totales disponibles
 * @apiSuccess {number} total Total de registros en la pagina actual
 * @apiSuccess {Object[]} gasto Arreglo con los gastos
 *  @apiSuccess {string} [gasto.id] Id del gasto
 *  @apiSuccess {number} gasto.valor Valor del gasto
 *  @apiSuccess {number} gasto.tipoGastoId  Identificador del tipo de gasto
 *  @apiSuccess {date} gasto.createdAt Fecha en la que se generó el gasto
 *  @apiSuccess {Object} gasto.tipo Tipo de gasto
 *      @apiSuccess {string} gasto.tipo.id Id del tipo de gasto
 *      @apiSuccess {imagen} gasto.tipo.imagen dirección de la imagen del tipo de gasto
 *      @apiSuccess {string} gasto.tipo.nombre Nombre del tipo de gasto
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "pagina": 1,
 *      "porPagina": 30,
 *      "totalPaginas": 1,
 *      "total": 2,
 *      "gastos": [
 *          {
 *              "id": "1b9518e6-4e5c-4bf9-bce7-223e5159d9e1",
 *              "valor": "45000.43",
 *              "tipoGastoId": 3,
 *              "createdAt": "2024-02-10T18:27:17.107Z",
 *              "nombre": "Salida",
 *              "tipo": {
 *                  "id": 3,
 *                  "imagen": "",
 *                  "nombre": "Alimentación"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError UsuarioSinSession El usuario no cuenta con una sesión activa
 * HTTP/1.1 403 Forbidden
 *
 */

/**
 * @api {post} gastos/ Agregar un Gasto al  listado de gastos del usuario
 * @apiName  CrearGasto
 * @apiGroup Gastos
 *
 *
 * @apiBody {number} valor Valor del gasto a registrar
 * @apiBody  {string} [nombre] Nombre o descripción del gasto
 * @apiBody {number}  tipoGastoId Identificador del tipo de gasto (ver /tipogastos)
 *
 * @apiSuccessExample Succes-Response:
 * HTTP/1.1 201 Created
 *  {
 *      "id": "4da603c6-d893-44df-84eb-feaed745943a",
 *      "userId": "cls6xa69y0009ic58b7a1gk7o",
 *      "valor": "48000",
 *      "nombre": "burger",
 *      "tipoGastoId": 3,
 *      "createdAt": "2024-02-14T19:57:09.550Z"
 *  }
 *
 * @apiError ErrorParseSchema Error en el body  del request
 * HTTP/1.1 400 Bad Request
 *
 */

/**
 * @api {get} gastos/:GastoId Obtener datos del gasto solicitado
 * @apiName DatosGasto
 * @apiGroup Gastos
 *
 * @apiParam {string} GastoId id del gastos a obtener mas información del gasto
 *
 * @apiSuccessExample Succes-Response:
 * HTTP/1.1 200 OK
 * {
 *      "nombre": "Salida",
 *      "valor": "45000.43",
 *      "createdAt": "2024-02-10T18:27:17.107Z",
 *      "tipoGastoId": 3,
 *      "tipo": {
 *          "id": 3,
 *          "nombre": "Alimentación",
 *          "imagen": ""
 *      }
 *  }
 */

/**
 * @api {put} gastos/:GastoId Editar el gasto solicitado
 * @apiName ActualizarGasto
 * @apiGroup Gastos
 *
 * @apiParam {string} GastoId id del gastos a obtener mas información del gasto
 *
 * @apiBody {number} valor Valor del gasto a registrar
 * @apiBody  {string} [nombre] Nombre o descripción del gasto
 * @apiBody {number}  tipoGastoId Identificador del tipo de gasto (ver /tipogastos)
 *
 * @apiSuccessExample Succes-Response:
 * HTTP/1.1 200 OK
 * Gasto editado con éxito
 */
