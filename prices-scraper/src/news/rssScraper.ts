const Parser = require("rss-parser");
const { Client } = require("pg");

module.exports = async (vendor, url, ticker) => {
  console.info(`Start scraping vendor ${vendor}.`);

  const parser = new Parser();
  const feed = await parser.parseURL(url);

  if (feed.items.length) {
    const client = new Client({
      user: "postgres",
      database: "aggregator",
      password: "postgres",
      host: "localhost",
    });

    let insertValues: string[] = [];

    feed.items.forEach((item) => {
      insertValues.push(
        `(TIMESTAMP '${item.pubDate}', '${vendor}', '${ticker}', '${item.link}', '${item.title}', '${item.content}')`
      );
    });

    const merge = `
      INSERT INTO news
      (date, vendor, ticker, url, title, text)
      VALUES
      ${insertValues.join(",")}
      on conflict(date, url, ticker) do nothing;
      commit;`;

    console.info(`About to merge ${insertValues.length} rows.`);

    client.connect();
    client.query(merge, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else if (res[0].rowCount) {
        console.info(`Added ${res[0].rowCount} new rows.`);
      }

      client.end();

      console.info(`Finish scraping vendor ${vendor}.`);
      console.info();
    });
  }
};
