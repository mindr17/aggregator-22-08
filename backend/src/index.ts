import { startWsServer } from './servers/WSServer';
import { startHttpServer } from './servers/httpServer';

const main = async () => {
  // const server = getHttpServer();
  startHttpServer();
  startWsServer();
  
  // const sendToFront = async () => {
  //   const news = await dbConnection.getNews();
    
  //   setTimeout(() => {
  //     myEmitter.emit('news', news);
  //     sendToFront();
  //   }, 1000);
  // };

  // sendToFront();
}
main();
