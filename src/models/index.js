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

    await db.sync({force: true});
    console.log("✔️ Base de datos conectada!");

  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
};

export default initDB;
