import { sequelize, DataTypes } from "../database.js";


const Obra = sequelize.define("Obra", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
    tableName: "obras", // ✅ debe coincidir con la DB
  freezeTableName: true
}


);

export default Obra;


