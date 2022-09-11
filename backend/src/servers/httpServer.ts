import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from '../modules/dbConnection';
import { fetchHandler } from '../modules/requestHandlers/requestHandlers';
import { requestRouting } from './requestRouting/requestRouting';

export const startHttpServer = (): void => {
  const port = process.env.PORT || '3031';
  const app = express();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  try {
    app.post('/', async (req: any, res: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      const body = req.body;
      console.log('body: ', body);
      
      const type: string = body.type;
      const operation = requestRouting[type];
      
      if (operation === undefined) {
        res.send(JSON.stringify({msg: 'operation is not supported!'}));
        throw new Error('This request type is not supported!');
      }
      
      const [ statusCode, msg ]: [number, string] = await operation(body.settings);
      
      res.send(JSON.stringify(msg));
    });
  } catch(err) {
    console.error(err);
  }

  try { 
    app.post('/test', async (req: any, res: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      const body = req.body;
      console.log('body: ', body);
      
      const type: string = body.type;
      const operation = requestRouting[type];
      
      if (operation === undefined) {
        res.send(JSON.stringify({msg: 'operation is not supported!'}));
        throw new Error('This request type is not supported!');
      }
      
      const [ statusCode, msg ]: [number, string] = await operation(body.settings);
      
      res.send(JSON.stringify(msg));
    });
  } catch(err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Main api at port ${port}`);
  });
};
