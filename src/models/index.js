import db from "../config/db.js";

const initDB = async () => {
  try {
    await db.authenticate();

    // relations

    await db.sync();
    console.log("✔️ Base de datos conectada!");
  } catch (error) {
    console.log("✖️ Error al conectar a la base de datos!");
    console.log(error);
    process.exit(1);
  }
};

export default initDB;
