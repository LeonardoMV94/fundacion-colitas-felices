import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL, PORT, JWT_SECRET } = process.env;

if(!DATABASE_URL){
  console.log('DATABASE_URL is not set in .env file');
  process.exit(1);
}

const env = {
  databaseUrl: DATABASE_URL ?? '',
  port: PORT ?? 3000,
  jwtSecret: JWT_SECRET ?? 'hola'
};

export default env;
