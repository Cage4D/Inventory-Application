const { Router } = require("express")
const gameRouter = Router()
const gameRouterController = require("../controllers/gameRouterController")

gameRouter.get("/", gameRouterController.gameRouterRedirect)
gameRouter.get("/new", gameRouterController.gameRouterGet)
gameRouter.post("/addGame", gameRouterController.gameRouterPost)
module.exports = gameRouter;