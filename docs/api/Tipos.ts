/**
 * @api {get} /tipos/ingresos Listado de 10 tipos de ingresos
 * @apiDescription Este endpoint retorna como máximo un arreglo con 10 tipos de ingresos
 * @apiGroup Tipos
 *
 * @apiSuccessExample {array} Success-Response:
 * HTTP/1.1 200 OK
 *  [
 *     {
 *         "id": 1,
 *         "nombre": "Otros",
 *         "descrip": null,
 *         "imagen": ""
 *     },
 *     {
 *         "id": 2,
 *         "nombre": "Salario",
 *         "descrip": "El pago regular recibido por trabajar en un empleo.",
 *         "imagen": ""
 *     }
 * ]
 *
 * @apiSuccess (200) {array} TiposIngresos Array con tipos de ingresos
 */

/**
 * @api {get} /tipos/gastos Listado de 10 tipos de gastos
 * @apiDescription Obtener como máximo un array con 10 tipos de gastos
 * @apiGroup Tipos
 *
 * @apiSuccessExample {array} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *     {
 *         "id": 1,
 *         "nombre": "Otros",
 *         "descrip": null,
 *         "imagen": "/app.ico"
 *     },
 *     {
 *         "id": 2,
 *         "nombre": "Vivienda",
 *         "descrip": null,
 *         "imagen": "/app.ico"
 *     }
 * ]
 *
 * @apiSuccess (200) {array} TiposGastos Array con tipos de gastos
 */
