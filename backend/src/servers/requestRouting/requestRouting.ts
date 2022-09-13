import { dbConnection } from "../../modules/dbConnection";

export const requestRouting: any = {
  news: async (settings: any) => {
    const msg = await dbConnection.getNews(settings);

    return [ 200, msg ];
  },
  article: async (settings: any) => {
    const news: any = await dbConnection.getNews({});
    
    const msg = news.find((item: any) => {
      if (item.id === settings.id) {
        return true;
      }
    });

    const ticker = msg.ticker;

    const dateNow = new Date();
    const unixMonth = 1000 * 60 * 60 * 24 * 7;
    console.log('unixMonth: ', unixMonth);
    const unixNow = dateNow.getTime();
    console.log('unixNow: ', unixNow);
    const unixDateFrom = dateNow.getTime() - unixMonth;
    console.log('unixDateFrom: ', unixDateFrom);
    const dateFromDate = new Date(unixDateFrom);
    console.log('dateFromDate: ', dateFromDate);
    const dateFrom = dateFromDate.toISOString();
    console.log('dateFrom: ', dateFrom);

    try {
      const prices = await dbConnection.getPrices(ticker, dateFrom);
      
      msg.prices = prices;

      return [ 200, msg ];
    } catch(e) {console.log(e);};
  },
};
