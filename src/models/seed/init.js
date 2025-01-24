// @ts-check
import db from "../../config/db.js";
import User from "../user.model.js";
import Pet from "../pet.model.js";
import Adoption from "../adoption.model.js";
import bcrypt from 'bcrypt'

(async () => {
  try {
    await db.authenticate();
    console.log("✔️ Base de datos conectada!");

    // relations
    User.hasMany(Adoption, { foreignKey: "userId" }); // User -> Adoption
    Adoption.belongsTo(User, { foreignKey: "userId" }); // Adoption -> User

    Pet.hasMany(Adoption, { foreignKey: "petId", onDelete: 'CASCADE' }); // Pet -> Adoption
    Adoption.belongsTo(Pet, { foreignKey: "petId" }); // Adoption -> Pet

    await db.sync();
    console.log("Tablas y sus relaciones creadas")

    // await User.bulkCreate([ 
    //   {
    //     name: "admin",
    //     email: "admin@correo.com",
    //     password: await bcrypt.hash('admin123',10),
    //     role: "administrador",
    //   },
    //   {
    //     name: "user",
    //     email: "user@asdasd.cl",
    //     password: await bcrypt.hash("user123",10),
    //     role: "adopt",
    //   },
    // ]);

    await Pet.bulkCreate([
      // {
      //   name: "Firulais",
      //   species: "Perro",
      //   breed: "Labrador",
      //   adoption_status: "Sin solicitud",
      //   entry_date: new Date(),
      //   photo_url: "https://www.perro.com/firulais.jpg",
      // },
      // {
      //   name: "Michi",
      //   species: "Gato",
      //   breed: "Siamés",
      //   adoption_status: "Sin solicitud",
      //   entry_date: new Date(),
      //   photo_url: "https://www.gato.com/michi.jpg",
      // },
      // {
      //   name: "Piolin",
      //   species: "Pájaro",
      //   breed: "Canario",
      //   adoption_status: "Sin solicitud",
      //   entry_date: new Date(),
      //   photo_url: "https://www.ave.com/piolin.jpg",
      // },
      {
        name: "Rex",
        species: "Perro",
        breed: "Pastor Alemán",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/rex.jpg",
      },
      {
        name: "Luna",
        species: "Gato",
        breed: "Persa",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/luna.jpg",
      },
      {
        name: "Paco",
        species: "Loro",
        breed: "Amazonas",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/paco.jpg",
      },
      {
        name: "Bugs",
        species: "Conejo",
        breed: "Holandés",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.conejo.com/bugs.jpg",
      },
      {
        name: "Hamtaro",
        species: "Hámster",
        breed: "Sirio",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.roedor.com/hamtaro.jpg",
      },
      {
        name: "Splash",
        species: "Pez",
        breed: "Betta",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/splash.jpg",
      },
      {
        name: "Donatello",
        species: "Tortuga",
        breed: "Mediterránea",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.reptil.com/donatello.jpg",
      },
      {
        name: "Balto",
        species: "Perro",
        breed: "Husky Siberiano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/balto.jpg",
      },
      {
        name: "Nagini",
        species: "Serpiente",
        breed: "Python Real",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.reptil.com/nagini.jpg",
      },
      {
        name: "Porky",
        species: "Cerdo",
        breed: "Vietnamita",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.cerdo.com/porky.jpg",
      },
      {
        name: "Thor",
        species: "Perro",
        breed: "Golden Retriever",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/thor.jpg",
      },
      {
        name: "Daisy",
        species: "Perro",
        breed: "Cocker Spaniel",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/daisy.jpg",
      },
      {
        name: "Rocky",
        species: "Perro",
        breed: "Boxer",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/rocky.jpg",
      },
      {
        name: "Simba",
        species: "Gato",
        breed: "Maine Coon",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/simba.jpg",
      },
      {
        name: "Cleo",
        species: "Gato",
        breed: "Angora",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/cleo.jpg",
      },
      {
        name: "Oliver",
        species: "Gato",
        breed: "Esfinge",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/oliver.jpg",
      },
      {
        name: "Kiwi",
        species: "Loro",
        breed: "Guacamayo",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/kiwi.jpg",
      },
      {
        name: "Nemo",
        species: "Pez",
        breed: "Payaso",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/nemo.jpg",
      },
      {
        name: "Flash",
        species: "Tortuga",
        breed: "Galápagos",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.reptil.com/flash.jpg",
      },
      {
        name: "Houdini",
        species: "Conejo",
        breed: "Mini Rex",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.conejo.com/houdini.jpg",
      },
      {
        name: "Pikachu",
        species: "Hámster",
        breed: "Roborovski",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.roedor.com/pikachu.jpg",
      },
      {
        name: "Zeus",
        species: "Perro",
        breed: "Doberman",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/zeus.jpg",
      },
      {
        name: "Lola",
        species: "Gato",
        breed: "Bombay",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/lola.jpg",
      },
      {
        name: "Tico",
        species: "Pájaro",
        breed: "Periquito",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/tico.jpg",
      },
      {
        name: "Bubbles",
        species: "Pez",
        breed: "Goldfish",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/bubbles.jpg",
      },
      {
        name: "Spike",
        species: "Erizo",
        breed: "Africano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.exotico.com/spike.jpg",
      },
      {
        name: "Roco",
        species: "Perro",
        breed: "Chihuahua",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/roco.jpg",
      },
      {
        name: "Mimi",
        species: "Gato",
        breed: "Birmano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/mimi.jpg",
      },
      {
        name: "Pancho",
        species: "Cacatúa",
        breed: "Ninfa",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/pancho.jpg",
      },
      {
        name: "Goldie",
        species: "Pez",
        breed: "Koi",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/goldie.jpg",
      },
      {
        name: "Sonic",
        species: "Erizo",
        breed: "Europeo",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.exotico.com/sonic.jpg",
      },
      {
        name: "Max",
        species: "Perro",
        breed: "Pastor Australiano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/max.jpg",
      },
      {
        name: "Bella",
        species: "Gato",
        breed: "Siberiano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/bella.jpg",
      },
      {
        name: "Polly",
        species: "Loro",
        breed: "Yaco",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/polly.jpg",
      },
      {
        name: "Guppy",
        species: "Pez",
        breed: "Neon",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/guppy.jpg",
      },
      {
        name: "Bandido",
        species: "Hurón",
        breed: "Albino",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.exotico.com/bandido.jpg",
      },
      {
        name: "Pelusa",
        species: "Conejo",
        breed: "Angora",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.conejo.com/pelusa.jpg",
      },
      {
        name: "Duke",
        species: "Perro",
        breed: "Pitbull",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/duke.jpg",
      },
      {
        name: "Stella",
        species: "Gato",
        breed: "Ragdoll",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/stella.jpg",
      },
      {
        name: "Piolín",
        species: "Canario",
        breed: "Roller",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/piolin2.jpg",
      },
      {
        name: "Nala",
        species: "Gato",
        breed: "Savannah",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/nala.jpg",
      },
      {
        name: "Rocky",
        species: "Hámster",
        breed: "Chino",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.roedor.com/rocky.jpg",
      },
      {
        name: "Ariel",
        species: "Pez",
        breed: "Ángel",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/ariel.jpg",
      },
      {
        name: "Toto",
        species: "Perro",
        breed: "Terrier",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.perro.com/toto.jpg",
      },
      {
        name: "Misty",
        species: "Gato",
        breed: "Nebelung",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.gato.com/misty.jpg",
      },
      {
        name: "Rio",
        species: "Loro",
        breed: "Eclectus",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.ave.com/rio.jpg",
      },
      {
        name: "Dory",
        species: "Pez",
        breed: "Cirujano",
        adoption_status: "Sin solicitud",
        entry_date: new Date(),
        photo_url: "https://www.pez.com/dory.jpg",
      }
    ]);

    // await Adoption.bulkCreate([
    //   {
    //     userId: 1,
    //     petId: 1,
    //     status: "Aprobada",
    //   },
    //   {
    //     userId: 2,
    //     petId: 2,
    //     status: "Pendiente",
    //   },
    //   {
    //     userId: 2,
    //     petId: 3,
    //     status: "Rechazada",
    //   },
    // ]);

  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
})();



