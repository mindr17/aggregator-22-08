const axios = require("axios").default;
const Parser = require("rss-parser");
const { Client } = require("pg");

setInterval(async () => {
  console.info("Start scraping.");

  const parser = new Parser();
  const feed = await parser.parseURL("https://gazprom.ru/rss");

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
        `(TIMESTAMP '${item.pubDate}', '${item.title}', '${item.link}', '${item.content}')`
      );
    });

    const merge = `
      INSERT INTO news
      (date, title, url, text)
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

      console.info("Finish scraping.");
    });
  }
}, 5000);

// // // Set variable
// // client.connect();
// // client.query(
// //   "CALL set_variable('lastSyncDate', '2022-08-08 01:01:01');",
// //   (err, res) => {
// //     console.log(err ? err.stack : res.rows);
// //     client.end();
// //   }
// // );

// // // Get variable
// // client.connect();
// // client.query("SELECT * FROM get_variable('lastSyncDate');", (err, res) => {
// //   console.log(err ? err.stack : res.rows);
// //   client.end();
// // });
