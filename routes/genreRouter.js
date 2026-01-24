const { Router } = require("express")
const genreRouter = Router()
const genreRouteController = require("../controllers/genreRouteController")

genreRouter.get("/", genreRouteController.genreRouteGet)

module.exports = genreRouter;