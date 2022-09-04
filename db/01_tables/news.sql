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