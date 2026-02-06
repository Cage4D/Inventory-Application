const queries = require("../data/queries")

exports.publishRouteGet = async (req, res) => {
    const getPublishers = await queries.getPublishers()
    res.render("pages/publisher-content", { data: getPublishers })
}