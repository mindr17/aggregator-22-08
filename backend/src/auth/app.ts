import 'dotenv/config';
import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
// Admin 12345
// admin@aggregator.com
// isanf5$

export const startAuthServer = () => {
  const app = express();
  
  app.use(cors());
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use('/api/auth', require('../auth/routes/auth.routes'));
  
  const PORT = process.env.PORT || config.get('port') || 5000;
  
async function start() {
    try {
      await mongoose.connect(config.get('uri'), {});
      app.listen(PORT, () => console.log(`Auth server started on port ${PORT}`));
  } catch (err) {
      console.log('error!', err);
      process.exit(1);
    }
  }
  
  start();
};
