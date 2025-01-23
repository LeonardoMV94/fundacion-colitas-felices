import { Sequelize } from 'sequelize';
import env from '../../env.js';

const db = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: (sql, timing) => {
    console.log(`[Sequelize] Consulta: ${sql}`);
  },
  define: {
    timestamps: true // añade 2 columnas, created_At y updated_At
  },
  pool: {
    max: 5, // maximo numero de conexiones al pool
    min: 0, // minimo de conectados al pool
    acquire: 30000, // tiempo de intentos de reconexion despues de un error en milisegundos
    idle: 10000 // tiempo de inactividad antes de cerrar conexion en milisegundos
  }
});

export default db;
