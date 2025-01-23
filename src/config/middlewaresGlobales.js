
  const middlewareGlobalHandlebars = (req, res, next) => {
      res.locals.year = new Date().getFullYear()
      // res.locals.csrfToken = req.csrfToken(),
      res.locals.nombre = req.cookies.nombre || null
      next()
  }




const middlewareGlobales = (app) => {
  app.use(middlewareGlobalHandlebars);
};

export default middlewareGlobales;
