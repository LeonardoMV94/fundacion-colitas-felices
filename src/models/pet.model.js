import db from "../config/db.js";
import { DataTypes } from "sequelize";


const Pet = db.define('Pets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adoption_status: {
        type: DataTypes.ENUM('Sin solicitud', 'Aprobada', 'Rechazada', 'Pendiente'),
        defaultValue: 'Pendiente',
        validate: {
            isIn: [['Sin solicitud', 'Aprobada', 'Rechazada', 'Pendiente'], 'Invalid status: debe ser Sin solicitud, Aprobada, Rechazada o Pendiente']
        }
    },
    entry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default Pet