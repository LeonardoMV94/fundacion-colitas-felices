import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PORT, JWT_SECRET } = process.env;

const env = {
  databaseUrl: DATABASE_URL ?? "",
  port: PORT ?? 3000,
  jwtSecret: JWT_SECRET ?? 'hola'
};

export default env;
