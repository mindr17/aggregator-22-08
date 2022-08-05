import 'dotenv/config';
import { IUrlParams } from '../backendTypes';
import express from "express";
import { BackendModel } from "../modules/BackendModel";
// import cors from "cors";
import bodyParser from "body-parser";
import { IGood } from '../../../frontend-ts/src/scripts/types';

const port = '4333';
const app = express();

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export const startBackServer = (): void => {
  try {
    app.post('/goods', async (
      req: any,
      res: any) => {

      res.setHeader("Access-Control-Allow-Origin", "*");

      const query = req.query;
      const queryParams: IUrlParams = {};

      if (query && query.length > 0) {
        for (const piece of query.split('&')) {
          const [key, value] = piece.split('=');
          queryParams[key] = value ? decodeURIComponent(value) : '';
        }
      }

      const backendModel = new BackendModel();
      const filteredGoods: Array<IGood> = backendModel.getGoods(req.body);
      
      // res.send(filteredGoods);
      res.send(JSON.stringify(filteredGoods));
    });
  } catch(err) {
    console.error(err);
  }
    
  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
};
