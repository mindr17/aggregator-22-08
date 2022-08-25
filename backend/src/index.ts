import { startWsServer } from './servers/WSServer';
import { dbConnection } from './modules/dbConnection';
import { myEmitter } from './modules/myEmitter';

const main = async () => {
  startWsServer();
  
  const sendToFront = async () => {
    const news = await dbConnection.getNews();
    console.log('news: ', news);
    
    setTimeout(() => {
      myEmitter.emit('news', news);
      sendToFront();
    }, 1000);
  };

  sendToFront();
}
main();
