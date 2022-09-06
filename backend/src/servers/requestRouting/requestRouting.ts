import { dbConnection } from "../../modules/dbConnection";

export const requestRouting = {
  news: async (settings: object) => {
    const msg = await dbConnection.getNews();

    return [ 200, msg ];
  },
};
