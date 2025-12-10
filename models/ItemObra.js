// models/ItemObra.js

// Asume que esta es la ruta correcta de tu instancia de Sequelize
import { sequelize, DataTypes } from "../database.js";


const ItemObra = sequelize.define('ItemObra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    obraId: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: { 
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    // Configuraciones adicionales
    indexes: [
        {
            // Asegura que no se repita el nombre del ítem dentro de la misma obra
            unique: true, 
            fields: ['obraId', 'nombre'] 
        }
    ]
});

export default ItemObra;