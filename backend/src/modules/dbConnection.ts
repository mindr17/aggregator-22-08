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
          try {

            this._client = new Client({
              user: "postgres",
              database: "aggregator",
              password: "postgres",
              host: "localhost",
            });
  
            this._client.connect();
            
            const searchQuery = `
              SELECT *
              FROM get_news('2022-08-08 19:05:06')
              LIMIT 50;
            `;
            
            const searchQuery2 = `
              SELECT *
              FROM get_news('2022-08-08 19:05:06')
              WHERE to_tsvector(title) @@ to_tsquery('${settings?.search}')
              LIMIT 50;
            `;

            const mySearchQuery = (() => {
              if (!settings) return searchQuery;
              if (!settings.search) return searchQuery;

              return searchQuery2;
            })();

            this._client.query(mySearchQuery, (err: { stack: any; }, res: { rows: any; }) => {
              if (!res) res = {rows: []};

              this._client.end();
              try {
                console.log('res.rows: ', res.rows);
                resolve(res.rows);
              } catch(e) {
                console.log(e);
                resolve([]);
              }
            });
          } catch (e) {console.error(e)}
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

        this._client.end();

        resolve(res.rows);
      })
    });
    
    return res;
  }

  async addNews(article: any) {
    try {    
      const res = await new Promise(
        (resolve, reject) => {
          try {
            const { time, title, text } = article;

            this._client = new Client({
              user: "postgres",
              database: "aggregator",
              password: "postgres",
              host: "localhost",
            });
  
            this._client.connect();
            
            const merge = `
              INSERT INTO news
              (date, vendor, ticker, url, title, text)
              VALUES
              (TIMESTAMP '2022-09-16 19:05:06', 'manual', 'TEST', 'link', '${title}', '${text}');
            `;
            
            // const mySearchQuery = (() => {
            //   if (!settings) return searchQuery;
            //   if (!settings.search) return searchQuery;
              
            //   return searchQuery2;
            // })();
  
            this._client.query(merge, (err: any, res: any) => {
              if (err) {
                console.error(err.stack);
              } else if (res[0].rowCount) {
                console.info(`Added ${res[0].rowCount} new rows.`);
              }

              if (!res) res = {rows: []};
              
              this._client.end();
              try {
                resolve(res.rows);
              } catch(e) {
                console.log(e);
                resolve([]);
              }
            });
          } catch (e) {console.error(e)}
        }
      );

      return res;
    } catch(e) {console.error(e)};
  }

  async deleteOldNews(date: any) {
    try {    
      const res = await new Promise(
        (resolve, reject) => {
          // try {
          //   this._client = new Client({
          //     user: "postgres",
          //     database: "aggregator",
          //     password: "postgres",
          //     host: "localhost",
          //   });

          //   this._client.connect();
            
          //   const merge = `
          //     DELETE FROM news
          //     WHERE date < '${date}';
          //   `;
  
          //   this._client.query(merge, (err: any, res: any) => {
          //     if (err) {
          //       console.error(err.stack);
          //     } else if (res[0].rowCount) {
          //       console.info(`Added ${res[0].rowCount} new rows.`);
          //     }

          //     if (!res) res = {rows: []};
              
          //     this._client.end();
          //     try {
          //       resolve(res.rows);
          //     } catch(e) {
          //       console.log(e);
          //       resolve([]);
          //     }
          //   });
          // } catch (e) {console.error(e)}
        }
      );

      return res;
    } catch(e) {console.error(e)};
  }


}

export const dbConnection = new DbConnection();
