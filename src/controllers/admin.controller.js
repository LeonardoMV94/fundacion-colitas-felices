import Pet from '../models/pet.model.js'


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

export { adminPetController, adminPetControllerAgregarForm, adminPetControllerAgregar, adminPetControllerEdit };
