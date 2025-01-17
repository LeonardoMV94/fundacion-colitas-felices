import path from "node:path";
import exhbs from "express-handlebars";
import { format } from 'date-fns';

const hbs = exhbs.create({
  //defaultLayout: 'base', -> 'main' es por default
  layoutsDir: path.join(process.cwd(), "src/views/layouts"),
  partialsDir: path.join(process.cwd(), "src/views/partials"),
  extname: "hbs", // extension de los archivos .handlebars -> .hbs
  helpers: {
    eq: (a, b) => a === b,
    or: (a, b) => a || b,
    formatDate: (date) => {
      return format(new Date(date), 'yyyy-MM-dd');
    }
  },
});

export default hbs;
