// import { Client } from 'pg';
const { Client } = require("pg");

class DbConnection {
  private _client: any;

  constructor() {
  }

  async getNews(settings: any) {
    try {
      const res = await new Promise(
        (resolve, reject) => {
          this._client = new Client({
            user: "postgres",
            database: "aggregator",
            password: "postgres",
            host: "localhost",
          });

          this._client.connect();
          
          const searchQuery = `
            SELECT *
            FROM get_news('2022-08-09 19:05:06');
          `;

          console.log('settngs.search: ', settings.search);

          const searchQuery2 = `
            SELECT *
            FROM get_news('2022-08-09 19:05:06')
            WHERE to_tsvector(title) @@ to_tsquery('${settings.search}');
          `;
          // WHERE Contains(text, '"*мечта*"') > 0;

          const mySearchQuery = (() => {
            if (settings.search) return searchQuery2;

            return searchQuery;
          })();

          this._client.query(mySearchQuery, (err: { stack: any; }, res: { rows: any; }) => {
            if (!res) res = {rows: []};
            
            this._client.end();
            try {
              resolve(res.rows);
            } catch(e) {
              console.log(e);
              resolve([]);
            }
          });
        }
      );

      return res;
    } catch(e) {console.error(e)};
  }

  async getPrices(ticker: string, dateFrom: string) {
    try {
      const res = await new Promise(
        (resolve, reject) => {
          this._client = new Client({
            user: "postgres",
            database: "aggregator",
            password: "postgres",
            host: "localhost",
          });
          
          this._client.connect();
  
          const queryStr = `
            SELECT *
            FROM get_prices('${dateFrom}')
            WHERE ticker = '${ticker}';
          `;
  
          this._client.query(queryStr, (err: { stack: any; }, res: { rows: any; }) => {
            this._client.end();
            try {
              resolve(res.rows);
            } catch(e) {
              console.error(e)
              reject('Prices query failed!');
            };
          });
      });
      
      return res;
    } catch(e){console.error(e)};
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

        this._client.connect();
        
        this._client.query("CALL set_variable('lastSyncDate', '2022-08-08 01:01:01');", (err: { stack: any; }, res: { rows: any; }) => {
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
