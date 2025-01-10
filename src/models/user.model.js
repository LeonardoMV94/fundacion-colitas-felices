import db from "../config/db.js";
import { DataTypes } from "sequelize";

const User = db.define('User',{
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
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin'], 'Invalid role: debe ser user o admin']
        }
    }
})

export default User