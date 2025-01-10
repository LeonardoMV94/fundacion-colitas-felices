import db from "../config/db.js";
import { DataTypes } from "sequelize";

const User = db.define('Users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255]
        }
    },
    role: {
        type: DataTypes.ENUM('adopt', 'administrador'),
        defaultValue: 'adopt',
        validate: {
            isIn: [['adopt', 'administrador'], 'Invalid role: debe ser adopt o administrador']
        }
    }
})

export default User