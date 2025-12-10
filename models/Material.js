import { sequelize, DataTypes } from "../database.js";


const Material = sequelize.define("Material", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
},
{
tableName: "materials", // ✅ debe coincidir con la DB
  freezeTableName: true
}
);

export default Material;



