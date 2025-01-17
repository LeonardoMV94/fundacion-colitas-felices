import db from "../config/db.js";
import Pet from "./pet.model.js";
import User from "./user.model.js";
import Adoption from "./adoption.model.js";

const initDB = async () => {
  try {
    await db.authenticate();

    // relations
    User.hasMany(Adoption, { foreignKey: "userId" }); // User -> Adoption
    Adoption.belongsTo(User, { foreignKey: "userId" }); // Adoption -> User

    Pet.hasMany(Adoption, { foreignKey: "petId", onDelete: 'CASCADE' }); // Pet -> Adoption
    Adoption.belongsTo(Pet, { foreignKey: "petId" }); // Adoption -> Pet

    await db.sync();
    console.log("✔️ Base de datos conectada!");

    // // administracion de solicitudes
    // /*
    // SELECT 
    //     adoptions.id, 
    //     adoptions.status, 
    //     adoptions.request_date, 
    //     users.name AS user_name, 
    //     pets.name AS pet_name
    //   FROM adoptions
    //   JOIN users ON adoptions.userId = users.id
    //   JOIN pets ON adoptions.petId = pets.id
    // */
    // const adoptions = await Adoption.findAll({ 
    //   attributes: ['id','status','request_date',],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["name"],
    //     },
    //     {
    //       model: Pet,
    //       attributes: ['name']
    //     },
    //   ],
      
    // });
    
    // console.log(adoptions.map((adoption) => adoption.toJSON()));

    // console.log('#####################')
    // // administracion de mascotas 
    // const mascotas = await  Pet.findAll({
    //   attributes: ['id','name', 'species','breed','adoption_status']
    // })
    // console.log( mascotas.map(m => m.toJSON()))

    // console.log('#####################')

    // // filtro por status de mascota
    // const status = 'Sin solicitud' // <- variable que vendra de un form req.body.select
    // const mascotas2 = await  Pet.findAll({
    //   where: {
    //     adoption_status: status
    //   },
    //   attributes: ['id','name', 'species','breed','adoption_status']
    // })
    // console.log( mascotas2.map(m => m.toJSON()))


  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
};

export default initDB;
