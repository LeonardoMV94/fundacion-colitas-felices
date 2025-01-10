import express from "express";
import env from "./env.js";
import configExpress from './src/config/index.js'
import initDB from './src/models/index.js'
import db from './src/config/db.js'

const app = express();

// config -> hbs cors json urlEncoded
configExpress(app)
// midlewares -> 
// routes -> rutas




app.listen(env.port, async () => {
  console.log(`Server is running on http://localhost:${env.port}/`);
  await initDB()

});
