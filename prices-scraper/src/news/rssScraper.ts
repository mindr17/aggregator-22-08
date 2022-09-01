const Parser = require("rss-parser");
const { Client } = require("pg");

module.exports = async (url, vendor) => {
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

    let tempTableValues: string[] = [];

    feed.items.forEach((item) => {
      tempTableValues.push(
        `(TIMESTAMP '${item.pubDate}', '${vendor}', '${item.title}', '${item.link}', '${item.content}')`
      );
    });

    const merge = `
      INSERT INTO news
      (date, vendor, title, url, text)
      VALUES
      ${tempTableValues.join(",")}
      on conflict(date, url) do nothing;
      commit;`;

    console.info(`About to merge ${tempTableValues.length} rows.`);

    client.connect();
    client.query(merge, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.info(`Added ${res[0].rowCount} new rows.`);
      }

      client.end();

      console.info(`Finish scraping vendor ${vendor}.`);
      console.info();
    });
  }
};
