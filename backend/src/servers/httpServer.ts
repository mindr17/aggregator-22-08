import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import { dbConnection } from '../modules/dbConnection';
import { fetchHandler } from '../modules/requestHandlers/requestHandlers';

export const startHttpServer = (): void => {
  const port = '3031';
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  try {
    app.post('/', async (req: any, res: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      const body = res.body;
      console.log('body: ', body);

      const news = await dbConnection.getNews();
      
      res.send(JSON.stringify(news));
    });
  } catch(err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Fetch api listening at http://localhost:${port}`);
  });
};

// export const startHttpServer = (): void => {
//   try {
//     const server = createServer(async (
//       req: IncomingMessage, res: ServerResponse
//     ): Promise<void> => {
//       try {
//         res.setHeader("Access-Control-Allow-Origin", "*");

//         // const myResponse = await fetchHandler['getLastNews'];
//         const news = await dbConnection.getNews();
//         console.log('news: ', news);
//         const myResponse = JSON.stringify(news);


//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(myResponse);
//       } catch(err) {
//         console.error(err);
//       }
//     });
    
//     const PORT: string = process.env.PORT || '3031';

//     server.listen(PORT, () => console.log(`Http server listening on port ${PORT}`));
//   } catch(err) {
//     console.error(`Error in http server!\n${err}`);
//   }
// };

// export const getHttpServer = () => {
//   try {
//     const server = createServer(async (
//       req: IncomingMessage, res: ServerResponse
//     ): Promise<void> => {
//       try {
//         const res = await fetchHandler['getLastNews'];
//       } catch(err) {
//         console.error(err);
//       }
//     });
    
//     const PORT: string = '3031';
  
//     return server;    
//   } catch(err) {
//     console.error(`Error in http server!\n${err}`)
//   }
// };
