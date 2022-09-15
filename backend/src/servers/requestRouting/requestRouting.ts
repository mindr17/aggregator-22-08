import { dbConnection } from "../../modules/dbConnection";

export const requestRouting: any = {
  news: async (props: any) => {
    const msg = await dbConnection.getNews(props.req.body.settings);

    return [ 200, msg ];
  },
  article: async (props: any) => {
    const news: any = await dbConnection.getNews({});
    
    const msg = news.find((item: any) => {
      if (item.id === props.req.body.settings.id) {
        return true;
      }
    });

    const ticker = msg.ticker;
    const dateNow = new Date();
    const unixMonth = 1000 * 60 * 60 * 24 * 7;
    const unixNow = dateNow.getTime();
    const unixDateFrom = dateNow.getTime() - unixMonth;
    const dateFromDate = new Date(unixDateFrom);
    const dateFrom = dateFromDate.toISOString();

    try {
      const prices = await dbConnection.getPrices(ticker, dateFrom);
      
      msg.prices = prices;

      return [ 200, msg ];
    } catch(e) {console.log(e);};
  },
  addnews: async (props: any) => {
    const msg = await dbConnection.addNews(props.req.body.article);

    return [ 200, msg ];
  },
};
