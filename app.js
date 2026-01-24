const express = require("express")
const app = express()
const path = require("node:path")
const PORT = 3000
const indexRouter = require("./routes/indexRouter")
const genreRouter = require("./routes/genreRouter")
const platformRouter = require("./routes/platformRouter")
const publisherRouter = require("./routes/publisherRouter")
const assetsPath = path.join(__dirname, "public")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(assetsPath))
app.use("/", indexRouter)
app.use("/genre", genreRouter)
app.use("/platform", platformRouter)
app.use("/publisher", publisherRouter)

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`listening on PORT ${PORT}`)
})