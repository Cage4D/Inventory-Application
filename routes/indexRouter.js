const { Router } = require("express")
const indexRouter = Router()
const indexRouteController = require("../controllers/indexRouteController")

indexRouter.get("/", indexRouteController.indexRouteGet)

module.exports = indexRouter;