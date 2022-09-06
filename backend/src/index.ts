import { startWsServer } from './servers/WSServer';
import { startHttpServer } from './servers/httpServer';
import { startAuthServer } from './auth/app';
import { dbConnection } from './modules/dbConnection';
// import { myEmitter } from './modules/myEmitter';

const main = async () => {
  startAuthServer();
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
