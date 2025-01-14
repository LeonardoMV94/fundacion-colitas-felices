import Pet from '../models/pet.model.js'
const adminPetController = async(req, res) => {
  try {
    const mascotas = await Pet.findAll({
        attributes: ['id', 'name', 'species','breed','adoption_status']
    })

    const marcotasParsed =  mascotas.map((mascota) => mascota.toJSON())

    res.render('admin/admin',{
        titulo: 'Administracion mascotas',
        mascotas: marcotasParsed
    })

  } catch (error) {
    res.render("500", {
      error: "hubo un error en el servidor",
    });
  }
};

export { adminPetController };
