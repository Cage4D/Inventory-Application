const { Router } = require("express")
const gameRouter = Router()
const gameRouterController = require("../controllers/gameRouterController")

gameRouter.get("/", gameRouterController.gameRouterGet)

module.exports = gameRouter;