const Parser = require("rss-parser");
const { Client } = require("pg");
const rssScraper = require("./news/rssScraper");
const fs = require("fs");
const path = require("node:path");
const config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../config.json"))
);

const setVariable = async (name: any, value: any): Promise<any> => {
  var client = new Client({
    user: "postgres",
    database: "aggregator",
    password: "postgres",
    host: "localhost",
  });

  client.connect();

  await client.query(`CALL set_variable('${name}', '${value}');`);
  await client.end();
};

const getVariable = async (name: any): Promise<any> => {
  var client = new Client({
    user: "postgres",
    database: "aggregator",
    password: "postgres",
    host: "localhost",
  });

  client.connect();

  const res = await client.query(`SELECT * FROM get_variable('${name}');`);

  await client.end();

  return res.rows[0].get_variable;
};

(async () => await setVariable("isWorking", false))();

setInterval(async () => {
  console.info("Attempt to start scraping.");

  const isWorking: boolean = (await getVariable("isWorking")) === "true";

  if (!isWorking) {
    console.info("Start scraping");

    await setVariable("isWorking", true);

    // Get news from RSS
    Object.entries(config.rss).forEach((x) => {
      rssScraper(x[1], x[0]);
    });

    // Get news from other resources...

    await setVariable("isWorking", false);
    await setVariable("lastSyncDate", new Date());
  } else {
    console.info("Previous scraping didn't finish.");
  }
}, config.timeout);
