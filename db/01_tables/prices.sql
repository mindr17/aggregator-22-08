CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  vendor VARCHAR NOT NULL,
  ticker VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  CONSTRAINT date_ticker_unique UNIQUE (date, ticker)
);