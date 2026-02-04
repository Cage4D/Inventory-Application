const { Client } = require("pg")
require("dotenv").config()

const SQL = `
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
        name TEXT NOT NULL,
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
    )

    INSERT INTO genres (name) VALUES
    ('Action'),
    ('RPG'),
    ('Strategy'),
    ('Sports'),
    ('Indie'),
    ('MMORPG'),
    ('Adventure'),
    ('Simulation')
    RETURNING *;

    INSERT INTO platforms (name) VALUES
    ('PC'),
    ('PlayStation'),
    ('Xbox'),
    ('Nintendo Switch'),
    ('Mobile')
    RETURNING *;
    
    INSERT INTO publishers (name) VALUES 
    ('FromSoftware'),
    ('Rockstar Games'),
    ('EA Sports'),
    ('Game Science')
    RETURNING *;

    INSERT INTO games (name, publisher_id) VALUES
    ('Elden Ring', 1),
    ('Red Dead Redemption 2', 2),
    ('FIFA 24', 3),
    ('Black Myth Wukong', 4)
    RETURNING *;
`;

async function main() {
    console.log("seeding....")
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main()