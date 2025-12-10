import { sequelize, DataTypes } from "../database.js";

import Obra from "./Obra.js";
import Material from "./Material.js";

const MaterialObra = sequelize.define("MaterialObra", {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
   tableName: "materialobras",
}

);

// Relaciones Many-to-Many
//Obra.belongsToMany(Material, { through: MaterialObra, foreignKey: "ObraId" });
//Material.belongsToMany(Obra, { through: MaterialObra, foreignKey: "MaterialId" });

// Relaciones directas necesarias para include:
//MaterialObra.belongsTo(Material, { foreignKey: "MaterialId" });
//MaterialObra.belongsTo(Obra, { foreignKey: "ObraId" });

export default MaterialObra;







