import express from "express";
import env from "./env.js";
import configExpress from './src/config/index.js'
import routes from "./src/routes/routes.js";
import middlewareGlobales from './src/config/middlewaresGlobales.js'

const app = express();

// config -> hbs cors json urlEncoded
configExpress(app)
// midlewares -> 
middlewareGlobales(app)
// routes -> rutas
routes(app)

app.listen(env.port, async () => {
  console.log(`Server is running on http://localhost:${env.port}/`);  
});
