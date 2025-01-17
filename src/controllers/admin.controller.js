import { Op } from 'sequelize';
import Pet from '../models/pet.model.js'
import Adoption from '../models/adoption.model.js';
import User from '../models/user.model.js';

const adminPetController = async(req, res) => {
  try {
    let status = req.body.status;
    let ordenar = req.body.orden;
    let mascotas;
    console.log(`filtro: ${status}`);
    console.log(`ordenar: ${ordenar}`);
    if (typeof status === 'undefined' || status === null || status === 'Mostrar todos') {
      status = "Mostrar todos";
      mascotas = await Pet.findAll({
        attributes: ['id', 'name', 'species','breed','adoption_status'],
        order: [['name', ordenar || 'asc']]
    });
  }else{
    mascotas = await Pet.findAll({
      where: {
          adoption_status: status,
      },
      attributes: ["id", "name", "species", "breed", 'adoption_status'],
       order: [['name', ordenar || 'asc']],
  });
  }
    const marcotasParsed =  mascotas.map((mascota) => mascota.toJSON())

    res.render('admin/admin',{
        titulo: 'Administracion mascotas',
        mascotas: marcotasParsed,
        status: status,
        orden: ordenar,
    })

  } catch (error) {
    res.render("500", {
      error: "hubo un error en el servidor",
    });
  }
};


const adminPetControllerAgregarForm = async(req, res) => {
  try {
    res.render("admin/agregarPet", {
        titulo: "Fundacion COLITAS | Administracion",
    })
} catch (error) {
    res.render("500", {
        error: "hubo un error en el servidor",
    });
} 
}

const adminPetControllerAgregar = async(req, res) => {
  try {
    const { name, species, breed, adoption_status, entry_date, photo_url } = req.body;
    const mascota = await Pet.create({
    name,
    species,
    breed,
    adoption_status,
    entry_date,
    photo_url,
    });
    res.render('admin/mascotaCreada', {
        message: 'Mascota creada correctamente',
        mascota: mascota.toJSON()
    });
} catch (error) {
    console.log(error);
    res.render("500", {
        error: "hubo un error en el servidor",
       
    });
} 
}
const adminPetControllerEdit = async(req, res) => {
  try {
    const mascota = await Pet.findByPk(req.params.id);
    if (!mascota) {
        return res.status(404).render('404', { error: 'Mascota no encontrada' });
    }
    res.render('admin/editar', { mascota: mascota.toJSON() });
} catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
}
}

const adminPetControllerEditSave = async(req, res) => {
  try {
    const { name, species, breed, adoption_status, entry_date, photo_url } = req.body;
    const mascota = await Pet.findByPk(req.params.id);
    if (!mascota) {
        return res.status(404).render('404', { error: 'Mascota no encontrada' });
    }
    await mascota.update({
        name,
        species,
        breed,
        adoption_status,
        entry_date,
        photo_url
    });
    res.render('admin/petActualizada', {
        message: 'Mascota actualizada correctamente',
        mascota: mascota.toJSON()
    });
} catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
}
}

const adminPetEliminar = async(req, res) => {
  try {
    const mascota = await Pet.findByPk(req.params.id);
    if (!mascota) {
        return res.status(404).render('404', { error: 'Mascota no encontrada' });
    }
    await mascota.destroy();
    res.render('admin/petEliminada', {
        message: 'Mascota eliminada correctamente',
        mascota: mascota.toJSON()
    });
} catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
}
}

const adminSolicitudes = async(req, res) => {
  try {
    const solicitudes = await Adoption.findAll({
        where: {
            status: ['Pendiente', 'Aprobada', 'Rechazada']
        },
        include: [
            {
                model: Pet,
                attributes: ['name'],
                as: 'Pet'
            },
            {
                model: User,
                attributes: ['name'],
                as: 'User'
            }
        ],
     
    });
    res.render('admin/solicitudes', {
        solicitudes: solicitudes.map(solicitud => solicitud.toJSON()),
      
    });
} catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
}
}

const adminSolicitudAprobar = async(req, res) => {
  try {
    const solicitud = await Adoption.findByPk(req.params.id, {
      include: [Pet, User]
    });
    if (!solicitud) {
      console.log('solicitud no encontrada');
      return res.status(404).render('404', { error: 'Solicitud no encontrada' });
    }
    await Adoption.update(
      { status: 'Aprobada' },
      { where: { id: req.params.id } }
    );

    await Pet.update(
      { adoption_status: 'Aprobada' },
      { where: { id: solicitud.petId } }
    );

    let newSolicitud = await Adoption.findByPk(req.params.id, {
      include: [Pet, User]
    });
    res.render('admin/estadoSolicitud', {
      message: 'Solicitud aprobada correctamente',
      solicitud: newSolicitud.toJSON()
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
  }
};

const adminSolicitudDenegar = async(req, res) => {
  try {
    const solicitud = await Adoption.findByPk(req.params.id, {
      include: [Pet, User]
    });
    if (!solicitud) {
      console.log('solicitud no encontrada');
      return res.status(404).render('404', { error: 'Solicitud no encontrada' });
    }
    await Adoption.update(
      { status: 'Rechazada' },
      { where: { id: req.params.id } }
    );

    let newSolicitud = await Adoption.findByPk(req.params.id, {
      include: [Pet, User]
    });
    res.render('admin/estadoSolicitud', {
      message: 'Solicitud rechazada correctamente',
      solicitud: newSolicitud.toJSON()
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Hubo un error en el servidor' });
  }
}
export { adminPetController, adminPetControllerAgregarForm, adminPetControllerAgregar, adminPetControllerEdit, adminPetControllerEditSave, adminPetEliminar, adminSolicitudes, adminSolicitudAprobar, adminSolicitudDenegar };
