const { Client } = require("pg");
require("dotenv").config();

const createTablesSQL = `
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS platforms (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS publishers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL UNIQUE,
        publisher_id INTEGER REFERENCES publishers(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS game_genres (
        game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, genre_id)
    );

    CREATE TABLE IF NOT EXISTS game_platforms (
        game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
        platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, platform_id)
    );
`;

const seedGenresSQL = `
    INSERT INTO genres (name) VALUES
    ('Action'),
    ('RPG'),
    ('Strategy'),
    ('Sports'),
    ('Indie'),
    ('MMORPG'),
    ('Adventure'),
    ('Simulation')
    ON CONFLICT DO NOTHING
    RETURNING *;
`;

const seedPublishersSQL = `
    INSERT INTO publishers (name) VALUES 
    ('FromSoftware'),
    ('Rockstar Games'),
    ('EA Sports'),
    ('Game Science'),
    ('Warner Bros'),
    ('CD Projekt'),
    ('ConcernedApe')
    ON CONFLICT DO NOTHING
    RETURNING *;
`;

const seedPlatformsSQL = `
    INSERT INTO platforms (name) VALUES
    ('PC'),
    ('PlayStation'),
    ('Xbox'),
    ('Nintendo Switch'),
    ('Mobile')
    ON CONFLICT DO NOTHING
    RETURNING *;
`;

const seedGamesSQL = `
    INSERT INTO games (name, publisher_id) VALUES
        (
            'Elden Ring', 
            (SELECT id from publishers WHERE name = 'FromSoftware')
        ),
        (
            'Red Dead Redemption 2', 
            (SELECT id from publishers WHERE name = 'Rockstar Games')
        ),
        (
            'FIFA 24',
            (SELECT id from publishers WHERE name = 'EA Sports')
        ),
        (
            'Black Myth Wukong',
            (SELECT id from publishers WHERE name = 'Game Science')
        ),
        (
            'Grand Theft Auto V',
            (SELECT id FROM publishers WHERE name = 'Rockstar Games')
        ),
        (
            'Sekiro: Shadows Die Twice',
            (SELECT id FROM publishers WHERE name = 'FromSoftware')
        ), 
        (
            'Madden NFL 24',
            (SELECT id FROM publishers WHERE name = 'EA Sports')
        ),
        (
            'Hogwarts Legacy',
            (SELECT id FROM publishers WHERE name = 'Warner Bros')
        ),
        (
            'Cyberpunk 2077',
            (SELECT id FROM publishers WHERE name = 'CD Projekt')
        ),
        (
            'Stardew Valley',
            (SELECT id FROM publishers WHERE name = 'ConcernedApe')
        )
        ON CONFLICT DO NOTHING
        RETURNING *;
`;

const seedGameGenresSQL = `
    INSERT INTO game_genres (game_id, genre_id) VALUES
    (
        (SELECT id FROM games WHERE name = 'Elden Ring'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Elden Ring'),
        (SELECT id FROM genres WHERE name = 'RPG')
    ), 
    (
        (SELECT id FROM games WHERE name = 'Red Dead Redemption 2'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Red Dead Redemption 2'),
        (SELECT id FROM genres WHERE name = 'Adventure')
    ),
    (
        (SELECT id FROM games WHERE name = 'FIFA 24'),
        (SELECT id FROM genres WHERE name = 'Sports')
    ),
    (
        (SELECT id FROM games WHERE name = 'FIFA 24'),
        (SELECT id FROM genres WHERE name = 'Simulation')
    ),
    (
        (SELECT id FROM games WHERE name = 'Black Myth Wukong'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Black Myth Wukong'),
        (SELECT id FROM genres WHERE name = 'RPG')
    ),
    (
        (SELECT id FROM games WHERE name = 'Grand Theft Auto V'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Grand Theft Auto V'),
        (SELECT id FROM genres WHERE name = 'Adventure')
    ),
    (
        (SELECT id FROM games WHERE name = 'Sekiro: Shadows Die Twice'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Sekiro: Shadows Die Twice'),
        (SELECT id FROM genres WHERE name = 'RPG')
    ),
    (
        (SELECT id FROM games WHERE name = 'Madden NFL 24'),
        (SELECT id FROM genres WHERE name = 'Sports')
    ),
    (
        (SELECT id FROM games WHERE name = 'Hogwarts Legacy'),
        (SELECT id FROM genres WHERE name = 'RPG')
    ),
    (
        (SELECT id FROM games WHERE name = 'Hogwarts Legacy'),
        (SELECT id FROM genres WHERE name = 'Adventure')
    ),
    (
        (SELECT id FROM games WHERE name = 'Cyberpunk 2077'),
        (SELECT id FROM genres WHERE name = 'Action')
    ),
    (
        (SELECT id FROM games WHERE name = 'Cyberpunk 2077'),
        (SELECT id FROM genres WHERE name = 'RPG')
    ),
    (
        (SELECT id FROM games WHERE name = 'Stardew Valley'),
        (SELECT id FROM genres WHERE name = 'Simulation')
    ),
    (
        (SELECT id FROM games WHERE name = 'Stardew Valley'),
        (SELECT id FROM genres WHERE name = 'Indie')
    )
    ON CONFLICT DO NOTHING
`;

const seedGamePlatformsSQL = `
INSERT INTO game_platforms (game_id, platform_id) VALUES
  ((SELECT id FROM games WHERE name = 'Elden Ring'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Elden Ring'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Red Dead Redemption 2'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Red Dead Redemption 2'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'FIFA 24'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'FIFA 24'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Black Myth Wukong'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Grand Theft Auto V'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Grand Theft Auto V'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Sekiro: Shadows Die Twice'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Sekiro: Shadows Die Twice'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Madden NFL 24'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Hogwarts Legacy'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Hogwarts Legacy'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Cyberpunk 2077'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Cyberpunk 2077'), (SELECT id FROM platforms WHERE name = 'PlayStation')),
  ((SELECT id FROM games WHERE name = 'Stardew Valley'), (SELECT id FROM platforms WHERE name = 'PC')),
  ((SELECT id FROM games WHERE name = 'Stardew Valley'), (SELECT id FROM platforms WHERE name = 'Nintendo Switch'))
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("seeding....");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(createTablesSQL);
    await client.query(seedGenresSQL);
    await client.query(seedPublishersSQL);
    await client.query(seedPlatformsSQL);
    await client.query(seedGamesSQL);
    await client.query(seedGameGenresSQL);
    await client.query(seedGamePlatformsSQL);
  } catch (err) {
    console.error("Seeding failed", err);
  } finally {
    await client.end();
  }
  console.log("done");
}

main();
