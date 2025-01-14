// @ts-check
import db from "../../config/db.js";
import User from "../user.model.js";
import Pet from "../pet.model.js";
import Adoption from "../adoption.model.js";

(async () => {
  try {
    await db.authenticate();
    console.log("✔️ Base de datos conectada!");

    await User.bulkCreate([ 
      {
        name: "admin",
        email: "admin@correo.com",
        password: "admin123",
        Rol: "administrador",
      },
      {
        name: "user",
        email: "user@asdasd.cl",
        password: "user123",
        Rol: "adopt",
      },
    ]);

    await Pet.bulkCreate([
      {
        name: "Firulais",
        species: "Perro",
        breed: "Labrador",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.per.com/firulais.jpg",
      },
      {
        name: "Michi",
        species: "Gato",
        breed: "Siames",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.per.com/mishi.jpg",
      },
      {
        name: "Piolin",
        species: "Pajaro",
        breed: "Canario",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.per.com/piolin.jpg",
      },
    ]);

    await Adoption.bulkCreate([
      {
        userId: 1,
        petId: 1,
        status: "Aprobada",
      },
      {
        userId: 2,
        petId: 2,
        status: "Pendiente",
      },
      {
        userId: 2,
        petId: 3,
        status: "Rechazada",
      },
    ]);

  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
})();



