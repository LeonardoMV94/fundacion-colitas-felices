import path from "node:path";
import exhbs from "express-handlebars";

const hbs = exhbs.create({
  //defaultLayout: 'base', -> 'main' es por default
  layoutsDir: path.join(process.cwd(), "src/views/layouts"),
  partialsDir: path.join(process.cwd(), "src/views/partials"),
  extname: "hbs", // extension de los archivos .handlebars -> .hbs
  helpers: {
    eq: (a, b) => a === b,
  },
});

export default hbs;
