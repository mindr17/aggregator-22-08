import 'dotenv/config';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { myEmitter } from '../modules/myEmitter';

const BACK_PORT: string = process.env.BACK_PORT || '3030';

export const startWsServer = (): void => {
  const wss = new WebSocketServer({ port: Number(BACK_PORT) });
  // const wss = new WebSocketServer({ server });
  console.log(`Hello! Websocket server has started on port ${BACK_PORT}!`);

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

    myEmitter.on('news', (event) => {
      console.log('event: ', event);

      const date = new Date();
      const messageObj = {
        type: 'news',
        msg: event,
      };
      console.log('messageObj: ', messageObj);

      duplex.write(JSON.stringify(messageObj));
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
