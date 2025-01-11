import { Router } from "express";
import { homeController } from "../controllers/homeController";

const routes = (app) => {
  const router = Router();

  router.get("/", homeController);

  app.use(router);
};

export default routes;
