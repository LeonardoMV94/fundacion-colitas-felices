import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Adoption = db.define("AdoptionsRequest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("Aprobada", "Rechazada", "Pendiente"),
    defaultValue: "Pendiente",
    validate: {
      isIn: [
        ["Aprobada", "Rechazada", "Pendiente"],
        "Invalid status: debe ser Aprobada, Rechazada o Pendiente",
      ],
    },
  },
  petId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Pets",
      key: "id",
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
  request_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Adoption;
