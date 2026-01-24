const { Router } = require("express")
const publisherRouter = Router()
const publisherRouteController = require("../controllers/publisherRouteController")

publisherRouter.get("/", publisherRouteController.publishRouteGet)

module.exports = publisherRouter;