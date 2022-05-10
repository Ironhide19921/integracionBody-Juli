var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const middleware = require("../middleware/middleware");
const { resultadoChat } = require("../controllers/chats");

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
router.get("/chat", resultadoChat);

module.exports = router;
