import { Router } from "express";
import { homeController } from "../controllers/homeController.js";
import { petController, onePetController,solicitudAdopcionMascota, cancelarAdoption } from "../controllers/petController.js";

const routes = (app) => {
  const router = Router();

  // usuarios
  router.get('/',homeController)
  router.get("/mascotas", petController);
  router.get("/mascotas/:id", onePetController);
  router.post("/mascotas/:id", solicitudAdopcionMascota);
  router.post("/mascotas/cancelar/:id", cancelarAdoption);
  //router.get("/mascotas/editar/:id" );

  // admin
  router.get("/admin/mascotas/editar/:id" );


  // si no encuentra la ruta solicitada por el cliente renderiza el template 404.hbs
  router.use((req, res) => {
    res.status(404).render("404");
  });

  app.use(router);
};

export default routes;
