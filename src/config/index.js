import path from "node:path";
import cors from "cors";
import express from "express";
import hbs from "./hbs.js";

const configExpress = (app) => {
  app.use(cors());
  app.use(express.json()); // res.json({}) JSON.stringlyfy({})
  app.use(express.urlencoded({ extended: true })); // const {usuario, apellido, telefono} = req.body

  // archivos estaticos
  app.use(express.static(path.join(process.cwd(), "src", "public")));

  // hbs
 // app.set("views", path.join(process.cwd(), "src", "views")); // views dentro de src
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
};

export default configExpress;
