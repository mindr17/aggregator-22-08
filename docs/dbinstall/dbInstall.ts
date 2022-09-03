import pg from 'pg';
const { Client } = pg;

const dbInstall = async () => {
  const client = new Client({
    user: "postgres",
    database: "aggregator",
    password: "postgres",
    host: "localhost",
  });

  await client.connect();

  const processQuery = async (queryString: string) => {
    await new Promise(
      async (resolve) => {
        client.query(queryString,
        async (err: any, res: any) => {
          console.log(err ? err.stack : 'success');
          resolve(res);
        })
      }
    );
  };

  await processQuery("CREATE TABLE IF NOT EXISTS news (id SERIAL PRIMARY KEY, date TIMESTAMP NOT NULL, title VARCHAR NOT NULL, text VARCHAR NOT NULL)");
  await processQuery("CREATE TABLE IF NOT EXISTS prices (id SERIAL PRIMARY KEY, date TIMESTAMP NOT NULL, ticker VARCHAR NOT NULL, price DECIMAL NOT NULL)");
  await processQuery("CREATE TABLE IF NOT EXISTS variables (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, value VARCHAR NULL, CONSTRAINT name_unique UNIQUE (name))");
  await processQuery("CREATE OR REPLACE FUNCTION get_news(startdate TIMESTAMP) RETURNS SETOF news AS $$ BEGIN RETURN query SELECT * FROM news WHERE date >= startdate; END $$ LANGUAGE plpgsql;");
  await processQuery("CREATE OR REPLACE FUNCTION get_prices(startdate TIMESTAMP) RETURNS SETOF prices AS $$ BEGIN RETURN query SELECT * FROM prices WHERE date >= startdate; END $$ LANGUAGE plpgsql;");
  await processQuery("CREATE OR REPLACE FUNCTION get_variable(variableName VARCHAR) RETURNS VARCHAR AS $$ SELECT MAX(value) FROM variables WHERE name = variableName; $$ LANGUAGE SQL;");
  await processQuery("CREATE OR REPLACE PROCEDURE set_variable(name VARCHAR, value VARCHAR) AS $$ INSERT INTO variables VALUES (DEFAULT, name, value) ON CONFLICT (name) DO UPDATE SET value = excluded.value; $$ LANGUAGE SQL;");
  await processQuery("INSERT INTO news VALUES (DEFAULT, TIMESTAMP '2022-08-08 04:05:06', 'Title1', 'Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1 Text 1'), (DEFAULT, TIMESTAMP '2022-08-08 05:05:06', 'Title2', 'Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2 Text 2'), (DEFAULT, TIMESTAMP '2022-08-08 06:05:06', 'Title3', 'Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3 Text 3'), (DEFAULT, TIMESTAMP '2022-08-08 07:05:06', 'Title4', 'Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4 Text 4');");
  await processQuery("INSERT INTO prices VALUES (DEFAULT, TIMESTAMP '2022-08-08 04:05:06', 'MSFT', 10.0), (DEFAULT, TIMESTAMP '2022-08-08 05:05:06', 'TSLA', 20.2), (DEFAULT, TIMESTAMP '2022-08-08 06:05:06', 'AAPL', 13.13);");

  await client.end();
};

dbInstall();
