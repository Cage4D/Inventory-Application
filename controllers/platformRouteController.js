const queries = require("../data/queries")

exports.platformRouteGet = async (req, res) => {
    const getPlatforms = await queries.getPlatforms()
    res.render("pages/platform-content", { data: getPlatforms })
}