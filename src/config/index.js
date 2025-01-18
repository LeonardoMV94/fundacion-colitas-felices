import path from "node:path";
import cors from "cors";
import express from "express";
import cookieParser from 'cookie-parser'
import hbs from "./hbs.js";
import csurf from "csurf";

const configExpress = (app) => {
  app.use(cors());
  app.use(express.json()); // res.json({}) JSON.stringlyfy({})
  app.use(express.urlencoded({ extended: true })); // const {usuario, apellido, telefono} = req.body

  // archivos estaticos
  app.use(express.static(path.join(process.cwd(), "src", "public")));

  app.use( cookieParser() )
  app.use(csurf({cookie: true}))

  // hbs
  app.set("views", path.join(process.cwd(), "src", "views")); // views dentro de src
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
};

export default configExpress;
