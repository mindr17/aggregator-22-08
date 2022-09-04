const Parser = require("rss-parser");
const { Client } = require("pg");
const rssScraper = require("./news/rssScraper");
const tradingViewScraper = require("./prices/tradingViewScraper");
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

// News
(async () => await setVariable("isNewsScrapingActive", false))();
setInterval(async () => {
  console.info("Attempt to start news scraping.");

  const isActive = (await getVariable("isNewsScrapingActive")) === "true";

  if (!isActive) {
    console.info("Start news scraping");

    await setVariable("isNewsScrapingActive", true);

    // Get news from RSS
    Object.entries(config.rss).forEach(async (x: [string, any]) => {
      try {
        await rssScraper(x[0], x[1].url, x[1].ticker);
      } catch (e) {
        console.error(`Error fetching data from ${x[1].url}`);
      }
    });

    // Get news from other resources...

    await setVariable("isNewsScrapingActive", false);
    await setVariable("newsScrapingLastSyncDate", new Date());
  } else {
    console.info("Previous news scraping didn't finish.");
  }
}, config.newsTimeout);

// Prices
(async () => await setVariable("isPricesScrapingActive", false))();
setInterval(async () => {
  console.info("Attempt to start prices scraping.");

  const isActive = (await getVariable("isPricesScrapingActive")) === "true";

  if (!isActive) {
    console.info("Start prices scraping");

    await setVariable("isPricesScrapingActive", true);

    // Get prices from TradingView
    try {
      const tickers = Array.from(
        new Set(Object.entries(config.rss).map((x: any) => x[1].ticker))
      );

      await tradingViewScraper(tickers);
    } catch (e) {
      console.error("Error fetching data from TradingView");
    }

    // Get prices from other resources...

    await setVariable("isPricesScrapingActive", false);
    await setVariable("pricesScrapingLastSyncDate", new Date());
  } else {
    console.info("Previous prices scraping didn't finish.");
  }
}, config.pricesTimeout);
