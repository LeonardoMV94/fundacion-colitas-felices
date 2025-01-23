import { Router } from 'express';
import { homeController } from '../controllers/homeController.js';
import {
  petController,
  onePetController,
  solicitudAdopcionMascota,
  cancelarAdoption,
  editarMascota,
  editarMascotaGet
} from '../controllers/petController.js';
import {isHaveToken} from '../config/auth.middleware.js';
import validarFormLogin from '../models/schema/validarFormLogin.js';
import {
  loginRenderController,
  loginFormulario,
  cerrarSesion,
  registroRenderController,
  registroFormularioController
} from '../controllers/auth.controller.js';

import {
  adminPetController,
  adminPetControllerAgregarForm,
  adminPetControllerAgregar,
  adminPetControllerEdit,
  adminPetControllerEditSave,
  adminPetEliminar,
  adminSolicitudes,
  adminSolicitudAprobar,
  adminSolicitudDenegar
} from '../controllers/admin.controller.js';
import middlewareValidadorFormEditPet from '../models/schema/validarFormularioEditarPet.js';
import validarFormRegistro from '../models/schema/validarFormRegistro.js';
import upload from '../config/subidaArchivos.js';

const middlewareCRFToken = (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.log(err, 'error en token');
    // Mostrar un mensaje amigable si falta o es inválido el token CSRF
    return res
      .status(403)
      .send(
        '<h1>Error: Token CSRF inválido o ausente. Intenta nuevamente.</h1>'
      );
  } else {
    const { _csrf } = req.body;
    console.log('token de formulario: ', _csrf);
    next(); // Para otros errores, seguir con el flujo normal
  }
};

const routes = (app) => {
  const router = Router();

  // usuarios
  router.get('/', homeController);
  router.get('/mascotas', petController); // localhost:3000/mascotas
  router.get('/mascotas/:id', onePetController);
  router.post('/mascotas/:id', solicitudAdopcionMascota);
  router.post('/mascotas/cancelar/:id', cancelarAdoption);
  //router.get("/mascotas/editar/:id" );

  // admin

  router.get('/admin/mascotas', isHaveToken, adminPetController);

  router.post('/admin/mascotas', isHaveToken, adminPetController);
  router.get('/admin/agregarPet', isHaveToken, adminPetControllerAgregarForm);
  router.post('/admin/agregarPet', upload.single('archivo'),  adminPetControllerAgregar);
  router.get('/admin/editar/:id', isHaveToken, adminPetControllerEdit);
  router.post('/admin/editar/:id', isHaveToken, adminPetControllerEditSave);
  router.get('/admin/eliminar/:id', isHaveToken, adminPetEliminar);
  router.get('/admin/solicitudes/', isHaveToken, adminSolicitudes);
  router.get('/admin/solicitud/aprobar/:id', adminSolicitudAprobar);
  router.get('/admin/solicitud/denegar/:id', adminSolicitudDenegar);

  router.get('/admin/mascotas/editar/:id', editarMascotaGet);
  router.post(
    '/admin/mascotas/editar/:id',
    middlewareValidadorFormEditPet,
    editarMascota
  );

  // auth
  router.get('/auth/login', loginRenderController);
  router.post(
    '/auth/login',
    middlewareCRFToken,
    validarFormLogin,
    loginFormulario
  );
  router.get('/auth/registro', registroRenderController);
  router.post(
    '/auth/registro',
    middlewareCRFToken,
    validarFormRegistro,
    registroFormularioController
  );
  router.get('/auth/logout', cerrarSesion);

  // si no encuentra la ruta solicitada por el cliente renderiza el template 404.hbs
  router.use((req, res) => {
    res.status(404).render('404', {
      layout: 'sin-partials',
      titulo: 'Error 404'
    });
  });

  app.use(router);
};

export default routes;
