import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PORT } = process.env;

const env = {
  databaseUrl: DATABASE_URL ?? "",
  port: PORT ?? 3000,
};

export default env;
