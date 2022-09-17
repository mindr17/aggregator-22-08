import { dbConnection } from './dbConnection';

export const dbCleaner = () => {
  const recursiveClean = () => {
    const now = new Date();
    const lastWeeksDate = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000
    );
  
    dbConnection.deleteOldNews(lastWeeksDate);

    setTimeout(() => {
      recursiveClean();
    }, 1000 * 60 * 60 * 24 * 7);
  };
  recursiveClean();
};
