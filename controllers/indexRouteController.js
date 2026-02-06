const queries = require("../data/queries");

exports.indexRouteGet = async (req, res) => {
  try {
    const allGames = await queries.getGamesWithPublishers();
    res.render("pages/home-content", { data: allGames })
  } catch (err) {
    console.error("Failed to fetch games", err)
    res.status(500).send("Internal Server error")
  }
};
