const pool = require("./pool")

async function getGamesWithPublishers() {
    const { rows } = await pool.query(`
    SELECT games.id, 
    games.name,
    publishers.name AS publisher,
    ARRAY_AGG(genres.name) FILTER (WHERE genres.name IS NOT NULL) AS genres 
    FROM games
    JOIN publishers ON games.publisher_id = publishers.id
    LEFT JOIN game_genres ON games.id = game_genres.game_id     
    LEFT JOIN genres ON game_genres.genre_id = genres.id
    GROUP BY games.id, publishers.name;
    `)
    return rows;
}

async function getGenres() {
    const { rows } = await pool.query(`
    SELECT 
    genres.id,
    genres.name AS genre,
    ARRAY_AGG(games.name ORDER BY games.name) AS games
    FROM genres
    JOIN game_genres ON genres.id = game_genres.genre_id
    JOIN games ON game_genres.game_id = games.id
    GROUP BY genres.id, genres.name
    ORDER BY genres.name;     
    `);
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
    getGamesWithPublishers,
    getGenres,
    getPublishers,
    getPlatforms,
}