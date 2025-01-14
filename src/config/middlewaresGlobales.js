
const middlewareGlobalHandlebars = (req, res, next) => {
    res.locals.year = new Date().getFullYear()

    next()
}


const middlewareGlobales = (app) => {
  app.use(middlewareGlobalHandlebars);
};

export default middlewareGlobales;
