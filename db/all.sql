CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  vendor VARCHAR NOT NULL,
  ticker VARCHAR NOT NULL,
  url VARCHAR NULL,
  title VARCHAR NOT NULL,
  text VARCHAR NOT NULL,
  CONSTRAINT date_url_ticker_unique UNIQUE (date, url, ticker)
);

CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  vendor VARCHAR NOT NULL,
  ticker VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  CONSTRAINT date_ticker_unique UNIQUE (date, ticker)
);

CREATE TABLE IF NOT EXISTS variables (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  value VARCHAR NULL,
  CONSTRAINT name_unique UNIQUE (name)
);

CREATE OR REPLACE FUNCTION get_news(startdate TIMESTAMP)
RETURNS SETOF news
AS $$
BEGIN
  RETURN query
    SELECT *
    FROM news
    WHERE date >= startdate;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_variable(variableName VARCHAR)
RETURNS VARCHAR
AS $$
  SELECT MAX(value)
  FROM variables
  WHERE name = variableName;
$$ LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE set_variable(name VARCHAR, value VARCHAR)
AS $$
  INSERT INTO variables VALUES
  (DEFAULT, name, value)
  ON CONFLICT (name) DO UPDATE 
    SET value = excluded.value;
$$ LANGUAGE SQL;
