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
    tableName: "itemobras", // ✅ NOMBRE REAL DE LA TABLA
    freezeTableName: true,  // ✅ EVITA pluralización automática
    timestamps: true,       // o false si no usás createdAt / updatedAt
    indexes: [
      {
        unique: true,
        fields: ["obraId", "nombre"],
      },
    ],
  }
);

export default ItemObra;
