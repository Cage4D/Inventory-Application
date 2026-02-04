const queries = require("../data/queries");

exports.indexRouteGet = async (req, res) => {
  try {
    const allGames = await queries.getGames();
    res.render("home", { data: allGames });
  } catch (err) {
    console.error("Failed to fetch games", err)
    res.status(500).send("Internal Server error")
  }
};
