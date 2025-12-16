// models/ItemObra.js
import { sequelize, DataTypes } from "../database.js";

const ItemObra = sequelize.define(
  "ItemObra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    obraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    codigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "item_obras",
    indexes: [
      {
        unique: true,
        fields: ["obraId", "nombre"], // ✅ FK CORRECTA
      },
    ],
  }
);

export default ItemObra;
