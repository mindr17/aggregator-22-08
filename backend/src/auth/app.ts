import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import { myConfig } from '../../myConfig';

export const startAuthServer = () => {
  const app = express();
  
  app.use(cors());
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use('/api/auth', require('../auth/routes/auth.routes'));
  
  const PORT = myConfig.port;
  
async function start() {
    try {
      const mongoUri = myConfig.uri;

      await mongoose.connect(mongoUri, {});
      
      app.listen(PORT, () => console.log(`Auth server started on port ${PORT}`));
  } catch (err) {
      console.log('error!', err);
      process.exit(1);
    }
  }
  
  start();
};
