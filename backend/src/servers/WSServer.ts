import 'dotenv/config';
import { myEmitter } from '../modules/myEmitter';
import { WebSocketServer, createWebSocketStream } from 'ws';

const BACK_PORT: string = process.env.BACK_PORT || '3030';

export const startWsServer = (): void => {
  const wss = new WebSocketServer({ port: Number(BACK_PORT) });
  console.log(`Websocket server started on port ${BACK_PORT}!`);

  wss.on('headers', (headers: string[]) => {
    console.log(headers);
  });

  wss.on('connection', async (ws) => {
    const duplex = createWebSocketStream(ws, {
      encoding: 'utf8',
      decodeStrings: false,
    });

    console.log(
      `New client connected!\nDuplex stream created with encoding: 'utf8', decodeStrings: false,\n`
    );

    myEmitter.on('news', (event: any) => {
      duplex.write(event);
    });

    for await (const chunk of duplex) {
      try {
        console.log(`Recieved: ${chunk}`);
      } catch (err) {
        console.error(err);
      }
    }

    ws.on('close', () => {
      duplex.destroy();
    })
  });
};












    // myEmitter.on('news', (event) => {
    //   console.log('event: ', event);

    //   const date = new Date();
    //   const messageObj = {
    //     type: 'news',
    //     msg: event,
    //   };
    //   console.log('messageObj: ', messageObj);

    //   duplex.write(JSON.stringify(messageObj));
    // });
    
    // Simple
    // const sendToFront = async () => {
    //   // const news = await dbConnection.getNews();
    //   const testRabbitMQEvent = {
    //       type: 'news',
    //       msg: {
    //         id: new Date(),
    //         date: '2022-09-08T12:57:15.000Z',
    //         vendor: 'prime',
    //         ticker: 'ROSN',
    //         url: 'https://1prime.ru/industry_and_energy/20220908/838055637.html',
    //         title: `New  test message: ${Math.random()}`,
    //         text: 'Металлургический завод на Сицилии остановился из-за дороговизны энергии',
    //       },
    //     };
      
    //   setTimeout(() => {
    //     duplex.write(JSON.stringify(testRabbitMQEvent));
    
    //     sendToFront();
    //   }, 1000);
    // };
    // sendToFront();