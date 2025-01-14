import Pet from "../models/pet.model.js";
import { Op } from "sequelize";

async function petController(req, res) {
  // todas las mascotas que tengan por adoption_status 'Sin solicitud'
  try {
    const mascotas = await Pet.findAll({
      where: {
        adoption_status: {
          [Op.or]: ["Sin solicitud", "Pendiente"],
        },
      },
      attributes: ["id", "name", "species", "breed", "adoption_status"],
    });

    const mascotasParsed = mascotas.map((mascota) => mascota.toJSON());

    res.render("pet", {
      titulo: "Fundacion | caremondae", // <- main.hbs
      estilos: "home", // <- main.hbs
      mascotas: mascotasParsed, // <- pet.hbs
    });
  } catch (error) {
    console.log(error);

    res.render("500", {
      errorDiv: "hubo un error en el servidor",
    });
  }
}

const onePetController = async (req, res) => {
  try {
    const { id } = req.params;
    const mascota = await Pet.findByPk(id);
    if (mascota == null) {
      res.send("Mascota no encontrada");
      return;
    }
    res.render("onePet", {
      mascota: mascota.toJSON(),
      
    });
  } catch (error) {
    res.render("500", {
      error: "hubo un error en el servidor",
    });
  }
};

const solicitudAdopcionMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const affected = await Pet.update(
      {
        adoption_status: "Pendiente",
      },
      { where: { id: id } }
    );
    if (!affected) {
      res.send("Mascota no encontrada");
      return;
    }
    const mascota = await Pet.findByPk(id);
    res.render("onePet", {
      mascota: mascota.toJSON(),
      mensaje: "solicitud en proceso", // mensajes flash
    });
  } catch (error) {
    console.log(error);
    res.render("500", {
      error: "hubo un error en el servidor",
    });
  }
};

const cancelarAdoption = async (req, res) => {
  try {
    const { id } = req.params;
    const mascota = await Pet.findByPk(id);

    if (!mascota) {
      res.send("Mascota no encontrada");
      return;
    }
    const [affected] = await Pet.update(
      {
        adoption_status: "Sin solicitud",
      },
      { where: { id: id } }
    );
    console.log(affected);
    if (affected <= 0) {
      res.render("onePet", {
        mascota: mascota.toJSON(),
        mensaje: "no se actualizo el estado", // mensajes flash
      });
      return;
    }
    const mascotaNew = await Pet.findByPk(id);
    res.render("onePet", {
      mascota: mascotaNew.toJSON(),
      mensaje: "solicitud cancelada exitosamente", // mensajes flash
    });
  } catch (error) {
    res.render("500", {
      error: "hubo un error en el servidor",
    });
  }
};

export {
  petController,
  onePetController,
  solicitudAdopcionMascota,
  cancelarAdoption,
};
