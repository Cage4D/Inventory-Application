const { Router } = require("express")
const platformRouter = Router()
const platformRouteController = require("../controllers/platformRouteController")

platformRouter.get("/", platformRouteController.platformRouteGet)

module.exports = platformRouter;