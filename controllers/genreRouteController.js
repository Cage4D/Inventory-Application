const queries = require("../data/queries")

exports.genreRouteGet = async (req, res) => {
    const getGenres = await queries.getGenres()
    res.render("pages/genre-content", { data: getGenres })
}