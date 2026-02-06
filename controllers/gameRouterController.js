exports.gameRouterGet = (req, res) => {
    res.render("pages/add-new-game", {})
}

exports.gameRouterRedirect = (req, res) => {
    res.redirect("/games/new");
}

exports.gameRouterPost = (req, res) => {
    res.redirect("/")
}