/**
 * @api {get} ingresos/ Listado con todos los ingresos del usuario
 * @apiName ListadoIngresos
 * @apiGroup Ingresos
 *
 * @apiQuery {number} [pagina=1] Pagina que se desea visualizar los datos
 * @apiQuery {number} [porPagina=30] Datos a mostrar por pagina
 *
 *
 * @apiSuccess {number} pagina Pagina  actual
 * @apiSuccess {number} porPagina Cantidad de datos por pagina
 * @apiSuccess {number} totalPaginas totales disponibles
 * @apiSuccess {number} total Total de registros en la pagina actual
 * @apiSuccess {Object[]} ingreso Arreglo con los ingresos
 *  @apiSuccess {string} [ingreso.id] Id del ingreso
 *  @apiSuccess {number} ingreso.valor Valor del ingreso
 *  @apiSuccess {number} ingreso.tipoingresoId  Identificador del tipo de ingreso
 *  @apiSuccess {date} ingreso.createdAt Fecha en la que se generó el ingreso
 *  @apiSuccess {Object} ingreso.tipo Tipo de ingreso
 *      @apiSuccess {string} ingreso.tipo.id Id del tipo de ingreso
 *      @apiSuccess {imagen} ingreso.tipo.imagen dirección de la imagen del tipo de ingreso
 *      @apiSuccess {string} ingreso.tipo.nombre Nombre del tipo de ingreso
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "pagina": 1,
 *      "porPagina": 30,
 *      "totalPaginas": 1,
 *      "total": 2,
 *      "ingresos": [
 *          {
 *              "id": "1b9518e6-4e5c-4bf9-bce7-223e5159d9e1",
 *              "nombre": "Salario",
 *              "tipoIngresoId": 3,
 *              "valor": "45000.43",
 *              "createdAt": "2024-02-10T18:27:17.107Z",
 *              "tipo": {
 *                  "id": 2,
 *                  "imagen": "",
 *                  "nombre": "Salario"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError UsuarioSinSession El usuario no cuenta con una sesión activa
 *
 */

/**
 * @api {post} ingresos/ Agregar un ingreso al listado de ingresos del usuario
 * @apiName  CrearIngreso
 * @apiGroup Ingresos
 *
 *
 * @apiBody {number} valor Valor del ingreso a registrar
 * @apiBody  {string} [nombre] Nombre o descripción del ingreso
 * @apiBody {number}  tipoIngresoId Identificador del tipo de ingreso (ver /TiposIngresos)
 *
 * @apiSuccessExample Succes-Response:
 * HTTP/1.1 201 Created
 *  {
 *      "id": "4da603c6-d893-44df-84eb-feaed745943a",
 *      "userId": "cls6xa69y0009ic58b7a1gk7o",
 *      "valor": "300000",
 *      "nombre": "Trabajos",
 *      "tipoIngresoId": 3,
 *      "createdAt": "2024-02-14T19:57:09.550Z"
 *  }
 *
 * @apiError UsuarioSinSession El usuario no cuenta con una sesión activa
 * @apiError ErrorParseSchema Error en el body  del request
 *
 */

/**
 * @api {get} ingreso/:ingresoId ver ingreso
 * @apiName Ingreso
 * @apiGroup Ingresos
 *
 * @apiParam  {String} ingresoId Id del Ingreso a buscar en el listado de ingresos del usuario
 *
 * @apiSuccess (200) {string} id Id del ingreso
 * @apiSuccess (200) {string} [nombre] nombre del ingreso
 * @apiSuccess (200) {number} tipoIngresoId Id del tipo de ingreso
 * @apiSuccess (200) {decimal} valor valor del ingreso
 * @apiSuccess (200) {Date} createdAt fecha en la que se registró el ingreso
 * @apiSuccess (200) {Object} tipo Objeto del tipo de ingreso
 *  @apiSuccess (200) {number} tipo.id Id del tipo de ingreso
 *  @apiSuccess (200) {string} tipo.imagen Dirección de la imagen del tipo de ingreso
 *  @apiSuccess (200) {string} tipo.nombre Nombre del tipo de ingreso
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "id": "2046b0bc-094a-47c8-983d-750a48a47ea4",
 *      "nombre": "Pago tel",
 *      "tipoIngresoId": 1,
 *      "valor": "350000",
 *      "createdAt": "2024-02-23T17:23:29.396Z",
 *      "tipo": {
 *          "id": 1,
 *          "imagen": "",
 *          "nombre": "Otros"
 *      }
 *  }
 *
 * @apiError UsuarioSinSession El usuario no cuenta con una sesión activa
 * @apiError IngresoNoEncontrado No de encontró un ingreso con el <code>ingresoId</code> en la lista de ingresos del usuario
 */
