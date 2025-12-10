// models/MovimientoMaterial.js

import { sequelize, DataTypes } from "../database.js";


// Asume que también debes importar Material y ItemObra para definir las asociaciones aquí
// import Material from './Material.js'; 
// import ItemObra from './ItemObra.js'; 

const MovimientoMaterial = sequelize.define('MovimientoMaterial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    obraId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    materialId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: { // 'ingreso' o 'egreso'
        type: DataTypes.STRING,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // <<-- CAMPO PARA CONTROL DE COSTOS -->>
    itemObraId: { 
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    // <<-- CAMPO PARA FECHAS HISTÓRICAS -->>
    fechaMovimiento: { 
        type: DataTypes.DATEONLY, 
        allowNull: true,
        defaultValue: DataTypes.NOW 
    }
    // NOTA: Sequelize ya agrega createdAt y updatedAt
},

{
     tableName: "movimientomaterials",
}

);

// Ejemplo conceptual de asociaciones (Asegúrate de tenerlas definidas en tu código real)
// MovimientoMaterial.belongsTo(ItemObra, { foreignKey: 'itemObraId' });
// MovimientoMaterial.belongsTo(Material, { foreignKey: 'materialId' }); 

export default MovimientoMaterial;
