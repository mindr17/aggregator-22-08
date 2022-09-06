// import { Client } from 'pg';
const { Client } = require("pg");

class DbConnection {
  private _client: any;

  constructor() {
  }

  async getNews() {
    const res = await new Promise(
      (resolve) => {
        this._client = new Client({
          user: "postgres",
          database: "aggregator",
          password: "postgres",
          host: "localhost",
        });

        this._client.connect();
        
        this._client.query("SELECT * FROM get_news('2022-08-08 04:05:06');", (err: { stack: any; }, res: { rows: any; }) => {

        this._client.end();

        resolve(res.rows);
      })
    });
    
    return res;
  }

  async getPrices() {
    const res = await new Promise(
      (resolve) => {
        this._client = new Client({
          user: "postgres",
          database: "aggregator",
          password: "postgres",
          host: "localhost",
        });

        this._client.connect();

        this._client.query("SELECT * FROM get_prices('2022-08-08 04:05:06');", (err: { stack: any; }, res: { rows: any; }) => {
        // console.log(err ? err.stack : res.rows);

        this._client.end();

        resolve(res.rows);
      })
    });
    
    return res;
  }

  async setVariable() {
    const res = await new Promise(
      (resolve) => {
        this._client = new Client({
          user: "postgres",
          database: "aggregator",
          password: "postgres",
          host: "localhost",
        });

        this._client.connect();        this._client.query("CALL set_variable('lastSyncDate', '2022-08-08 01:01:01');", (err: { stack: any; }, res: { rows: any; }) => {
        // console.log(err ? err.stack : res.rows);

        this._client.end();

        resolve(res.rows);
      })
    });
    
    return res;
  }  

  async getVariable() {
    const res = await new Promise(
      (resolve) => {
        this._client = new Client({
          user: "postgres",
          database: "aggregator",
          password: "postgres",
          host: "localhost",
        });

        this._client.connect();

        this._client.query("SELECT * FROM get_variable('lastSyncDate');", (err: { stack: any; }, res: { rows: any; }) => {
        // console.log(err ? err.stack : res.rows);

        this._client.end();

        resolve(res.rows);
      })
    });
    
    return res;
  }  
}

export const dbConnection = new DbConnection();
