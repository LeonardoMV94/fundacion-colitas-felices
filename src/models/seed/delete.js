// @ts-check
import db from "../../config/db.js";
import User from "../user.model.js";
import Pet from "../pet.model.js";
import Adoption from "../adoption.model.js";

(async () => {
  try {
    await db.authenticate();
    console.log("✔️ Base de datos conectada!");

    await Adoption.drop({ cascade: true }); 
    await Pet.drop({ cascade: true });
    await User.drop({ cascade: true });
  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
})();
