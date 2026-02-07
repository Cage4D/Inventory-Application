const express = require("express")
const app = express()
const path = require("node:path")
const PORT = 3000
const indexRouter = require("./routes/indexRouter")
const genreRouter = require("./routes/genreRouter")
const platformRouter = require("./routes/platformRouter")
const publisherRouter = require("./routes/publisherRouter")
const gameRouter = require("./routes/gameRouter")
const assetsPath = path.join(__dirname, "public")
const expressLayouts = require("express-ejs-layouts")

app.use(express.static(assetsPath))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "partials/layout")

app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }))
app.use("/", indexRouter)
app.use("/genre", genreRouter)
app.use("/platform", platformRouter)
app.use("/publisher", publisherRouter)
app.use("/games", gameRouter)

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`listening on PORT ${PORT}`)
})