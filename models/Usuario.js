// backend/models/Usuario.js
import { sequelize, DataTypes } from "../database.js";

const Usuario = sequelize.define(
  "Usuario", // Nombre del modelo en JS
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "usuario"
    }
  },
  {
    tableName: "usuarios", // ⬅️ Nombre exacto de la tabla en la DB
    freezeTableName: true,  // ⬅️ Evita que Sequelize pluralice el nombre
    timestamps: true        // ⬅️ Para createdAt y updatedAt
  }
);

export default Usuario;
