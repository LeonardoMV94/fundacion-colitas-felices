import { Router } from "express";
import { homeController } from "../controllers/homeController.js";
import {
  petController,
  onePetController,
  solicitudAdopcionMascota,
  cancelarAdoption,
  editarMascota,
  editarMascotaGet,
} from "../controllers/petController.js";
import middlewareJWT from "../config/auth.middleware.js";
import validarFormLogin from "../models/schema/validarFormLogin.js";
import {
  loginRenderController,
  loginFormulario,
  cerrarSesion,
  registroRenderController , registroFormularioController
} from "../controllers/auth.controller.js";

import {
  adminPetController,
  adminPetControllerAgregarForm,
  adminPetControllerAgregar,
  adminPetControllerEdit,
  adminPetControllerEditSave,
  adminPetEliminar,
  adminSolicitudes,
  adminSolicitudAprobar,
  adminSolicitudDenegar,
} from "../controllers/admin.controller.js";
import middlewareValidadorFormEditPet from "../models/schema/validarFormularioEditarPet.js";
import validarFormRegistro from "../models/schema/validarFormRegistro.js";

const routes = (app) => {
  const router = Router();

  // usuarios
  router.get("/", homeController);
  router.get("/mascotas", petController); // localhost:3000/mascotas
  router.get("/mascotas/:id", onePetController);
  router.post("/mascotas/:id", solicitudAdopcionMascota);
  router.post("/mascotas/cancelar/:id", cancelarAdoption);
  //router.get("/mascotas/editar/:id" );

  // admin

  router.get("/admin/mascotas", middlewareJWT, adminPetController);

  router.post("/admin/mascotas", middlewareJWT, adminPetController);
  router.get("/admin/agregarPet", middlewareJWT, adminPetControllerAgregarForm);
  router.post("/admin/agregarPet", middlewareJWT, adminPetControllerAgregar);
  router.get("/admin/editar/:id", middlewareJWT, adminPetControllerEdit);
  router.post("/admin/editar/:id", middlewareJWT, adminPetControllerEditSave);
  router.get("/admin/eliminar/:id", middlewareJWT, adminPetEliminar);
  router.get("/admin/solicitudes/", middlewareJWT, adminSolicitudes);
  router.get("/admin/solicitud/aprobar/:id", adminSolicitudAprobar);
  router.get("/admin/solicitud/denegar/:id", adminSolicitudDenegar);

  router.get("/admin/mascotas/editar/:id", editarMascotaGet);
  router.post(
    "/admin/mascotas/editar/:id",
    middlewareValidadorFormEditPet,
    editarMascota
  );

  // auth
  router.get("/auth/login", loginRenderController);
  router.post("/auth/login", validarFormLogin, loginFormulario);
  router.get("/auth/registro", registroRenderController);
  router.post("/auth/registro", validarFormRegistro, registroFormularioController);
  router.get("/auth/logout", cerrarSesion);

  // si no encuentra la ruta solicitada por el cliente renderiza el template 404.hbs
  router.use((req, res) => {
    res.status(404).render("404", {
      layout: "sin-partials",
      titulo: "Error 404",
    });
  });

  app.use(router);
};

export default routes;
