const { connect, getCandles } = require("tradingview-ws");
const { Client } = require("pg");

const saveInDb = async (data: any[]) => {
  const client = new Client({
    user: "postgres",
    database: "aggregator",
    password: "postgres",
    host: "localhost",
  });

  const insertValues: string[] = [];

  data.forEach((item) => {
    insertValues.push(
      `(TIMESTAMP '${item.date}', '${item.vendor}', '${item.ticker}', '${item.price}')`
    );
  });

  const merge = `
    INSERT INTO prices
    (date, vendor, ticker, price)
    VALUES
    ${insertValues.join(",")}
    on conflict(date, ticker) do nothing;
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
  });
};

module.exports = async (tickers) => {
  const vendor = "TradingView";

  console.info(`Start scraping vendor ${vendor}.`);

  for await (const ticker of tickers) {
    console.info(`Start scraping ticker ${ticker}.`);

    const connection = await connect();

    const data = await getCandles({
      connection,
      symbols: ticker,
    });

    const candles = data[0];

    if (candles) {
      await saveInDb(
        candles.map((candle) => {
          const date = new Date(candle.timestamp * 1000);

          return {
            date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
            vendor,
            ticker,
            price: candle.close,
          };
        })
      );
    }

    await connection.close();

    console.info(`Finish scraping ticker ${ticker}.`);
    console.info();
  }
};
