const pool = require("./pool")

async function getGames() {
    const { rows } = await pool.query("SELECT * FROM games")
    return rows;
}

async function getGenres() {
    const { rows } = await pool.query("SELECT * FROM genres")
    return rows;
}

async function getPublishers() {
    const { rows } = await pool.query("SELECT * FROM publishers")
    return rows;
}

async function getPlatforms() {
    const { rows } = await pool.query("SELECT * from platforms")
    return rows;
}

module.exports = {
    getGames,
    getGenres,
    getPublishers,
    getPlatforms,
}