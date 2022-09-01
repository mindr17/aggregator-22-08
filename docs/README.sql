sudo -u postgres psql

SELECT 'CREATE DATABASE aggregator' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'aggregator')\gexec

\l

\c aggregator postgres

CREATE TABLE IF NOT EXISTS news (id SERIAL PRIMARY KEY, date TIMESTAMP NOT NULL, title VARCHAR NOT NULL, text VARCHAR NOT NULL)\gexec

CREATE TABLE IF NOT EXISTS prices (id SERIAL PRIMARY KEY, date TIMESTAMP NOT NULL, ticker VARCHAR NOT NULL, price DECIMAL NOT NULL)\gexec

CREATE TABLE IF NOT EXISTS variables (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, value VARCHAR NULL, CONSTRAINT name_unique UNIQUE (name))\gexec

CREATE OR REPLACE FUNCTION get_news(startdate TIMESTAMP) RETURNS SETOF news AS $$ BEGIN RETURN query SELECT * FROM news WHERE date >= startdate; END $$ LANGUAGE plpgsql;\gexec

CREATE OR REPLACE FUNCTION get_prices(startdate TIMESTAMP) RETURNS SETOF prices AS $$ BEGIN RETURN query SELECT * FROM prices WHERE date >= startdate; END $$ LANGUAGE plpgsql;\gexec

CREATE OR REPLACE FUNCTION get_variable(variableName VARCHAR) RETURNS VARCHAR AS $$ SELECT MAX(value) FROM variables WHERE name = variableName; $$ LANGUAGE SQL;\gexec

CREATE OR REPLACE PROCEDURE set_variable(name VARCHAR, value VARCHAR) AS $$ INSERT INTO variables VALUES (DEFAULT, name, value) ON CONFLICT (name) DO UPDATE SET value = excluded.value; $$ LANGUAGE SQL;\gexec

\dt

INSERT INTO news VALUES (DEFAULT, TIMESTAMP '2022-08-08 04:05:06', 'Title1', 'Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1'), (DEFAULT, TIMESTAMP '2022-08-08 05:05:06', 'Title2', 'Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2'), (DEFAULT, TIMESTAMP '2022-08-08 06:05:06', 'Title3', 'Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3'), (DEFAULT, TIMESTAMP '2022-08-08 07:05:06', 'Title4', 'Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4');

INSERT INTO prices VALUES (DEFAULT, TIMESTAMP '2022-08-08 04:05:06', 'MSFT', 10.0), (DEFAULT, TIMESTAMP '2022-08-08 05:05:06', 'TSLA', 20.2), (DEFAULT, TIMESTAMP '2022-08-08 06:05:06', 'AAPL', 13.13);
