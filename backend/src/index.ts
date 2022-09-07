import { startWsServer } from './servers/WSServer';
import { startHttpServer } from './servers/httpServer';
import { startAuthServer } from './auth/app';
import { dbConnection } from './modules/dbConnection';
// import { myEmitter } from './modules/myEmitter';

const main = async () => {
  process
    .on('unhandledRejection', (reason, p) => {
      console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
      console.error(err, 'Uncaught Exception thrown');
      // process.exit(1);
    });

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
