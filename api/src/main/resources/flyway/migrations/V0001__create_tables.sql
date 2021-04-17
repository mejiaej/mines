    CREATE TABLE IF NOT EXISTS mines.user (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(150) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mines.game(
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES mines.user(id),
      remaining_time INTEGER,
      board JSONB,
      status CHAR(1)
    )