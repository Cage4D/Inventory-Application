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
    ('Game Science')
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
        )
        ON CONFLICT DO NOTHING
        RETURNING *;
`;

async function main() {
  console.log("seeding....");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  try {
    await client.connect();
    await client.query(createTablesSQL);
    await client.query(seedGenresSQL);
    await client.query(seedPublishersSQL);
    await client.query(seedPlatformsSQL);
    await client.query(seedGamesSQL);
  } catch (err) {
    console.error("Seeding failed", err);
  } finally {
    await client.end();
  }
  console.log("done");
}

main();
