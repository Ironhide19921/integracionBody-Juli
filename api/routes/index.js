var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const middleware = require("../middleware/middleware");
const { executeTask } = require("../controllers/executeTask");

router.get("/", indexController.home);
/**
 * @swagger
 * /authenticate:
 *  get:
 *    description: You can try out your token authentication here.
 *    produces:
 *       - application/json
 *    responses:
 *      '403':
 *        description: Forbidden
 *      '200':
 *        description: Ok
 */
router.get(
  "/authenticate",
  middleware.verifyToken,
  indexController.authenticate
);

/**
 * @swagger
 * /executeTask:
 *  get:
 *    description: Recibe un request, toma el Body que debe tener las propiedades "idTask", "parameters" y "jsonParam" para redireccionarlas a la NeoApi al método ExecuteTask que corresponda.Tiene 2 formas de ejecutarse, si "jsonParam" es "false", cada parámetro de "parameters" se trata como un parámetro distinto para el idTask recibido, si en cambio es "true", se enviarán todos los parameters como un sólo parametro.
 *    produces:
 *       - application/json
 *    responses:
 *      '500':
 *        description: Internal Server Error
 *      '404':
 *        description: Not Found
 *      '200':
 *        description: Ok
 */
router.get("/executeTask", executeTask);

module.exports = router;
