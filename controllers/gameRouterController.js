const pool = require("../data/pool")
const { body, validationResult, matchedData } = require("express-validator")

const validateUser = [
    body("name")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 50 })
        .withMessage("Name must be between 1 and 50 characters"),
    body("publisher")
        .trim()
        .notEmpty()
        .isLength({ min:1, max: 50 })
        .withMessage("Publisher must be between 1 and 50 characters")
]

exports.gameRouterGet = (req, res) => {
    res.render("pages/add-new-game", {})
}

exports.gameRouterRedirect = (req, res) => {
    res.redirect("/games/new");
}

exports.gameRouterPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/add-new-game", {
        errors: errors.array()
      });
    }

    const { name, publisher } = matchedData(req);

    const genres = Array.isArray(req.body.genres)
      ? req.body.genres
      : [req.body.genres];

    const platforms = Array.isArray(req.body.platforms)
      ? req.body.platforms
      : [req.body.platforms];

    try {

      const pubResult = await pool.query(
        `INSERT INTO publishers (name)
         VALUES ($1)
         ON CONFLICT (name) DO NOTHING
         RETURNING id`,
        [publisher]
      );

      const publisherId = pubResult.rows[0]?.id
        ?? (await pool.query(
          `SELECT id FROM publishers WHERE name = $1`,
          [publisher]
        )).rows[0].id;

      const gameResult = await pool.query(
        `INSERT INTO games (name, publisher_id)
         VALUES ($1, $2)
         RETURNING id`,
        [name, publisherId]
      );

      const gameId = gameResult.rows[0].id;

      for (const genre of genres) {
        await pool.query(
          `INSERT INTO game_genres (game_id, genre_id)
           SELECT $1, id FROM genres WHERE name = $2
           ON CONFLICT DO NOTHING`,
          [gameId, genre]
        );
      }

      for (const platform of platforms) {
        await pool.query(
          `INSERT INTO game_platforms (game_id, platform_id)
           SELECT $1, id FROM platforms WHERE name = $2
           ON CONFLICT DO NOTHING`,
          [gameId, platform]
        );
      }

      res.redirect("/");

    } catch (err) {
      console.error(err);
      res.status(500).send("Database error");
    }
  }
];
