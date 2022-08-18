import 'dotenv/config';
import { WebSocketServer, createWebSocketStream } from 'ws';

const BACK_PORT: string = process.env.BACK_PORT || '3030';

export const startWsServer = (): void => {
  const wss = new WebSocketServer({ port: Number(BACK_PORT) });
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

    const wait = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const sendToFront = async () => {
      await wait(1000);

      const date = new Date();

      const messageObj = {
        msg: `Hello from backend! Time now is ${date}`,
      };

      duplex.write(JSON.stringify(messageObj));

      sendToFront();
    };

    sendToFront();

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
