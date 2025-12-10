// backend/models/associations.js

// 1. IMPORTAR TODOS LOS MODELOS
// (Rutas relativas simples, asumiendo que todos están en models/)
import Usuario from './Usuario.js';
import Obra from './Obra.js';
import Material from './Material.js';
import MaterialObra from './MaterialObra.js';
import MovimientoMaterial from './MovimientoMaterial.js';
import ItemObra from './ItemObra.js'; 
import { sequelize, DataTypes } from "../database.js";



// ----------------------------------------------------
// DEFINICIÓN DE ASOCIACIONES (RELACIONES)
// ----------------------------------------------------

// 1. RELACIONES DE MATERIALES DE OBRA (STOCK ACTUAL)
// Esta lógica estaba en MaterialObra.js, pero debe ser centralizada:

// a) Relación Muchos a Muchos entre Obra y Material (a través de MaterialObra)
Obra.belongsToMany(Material, { through: MaterialObra, foreignKey: "ObraId" });
Material.belongsToMany(Obra, { through: MaterialObra, foreignKey: "MaterialId" });

// b) Relaciones directas para las consultas con 'include' (ej. en /obras/:id/materiales)
MaterialObra.belongsTo(Material, { foreignKey: "MaterialId" });
MaterialObra.belongsTo(Obra, { foreignKey: "ObraId" });


// 2. RELACIONES DE MOVIMIENTOS (HISTORIAL)
// MovimientoMaterial necesita unirse a Obra, Material, ItemObra y Usuario.
MovimientoMaterial.belongsTo(Obra, { foreignKey: 'obraId' });
MovimientoMaterial.belongsTo(Material, { foreignKey: 'materialId' });
MovimientoMaterial.belongsTo(ItemObra, { foreignKey: 'itemObraId' });
MovimientoMaterial.belongsTo(Usuario, { foreignKey: 'usuarioId' }); // Para auditoría (asumiendo que usuarioId existe en MovimientoMaterial)

// 3. RELACIONES DE OBRA (Hacia abajo)
// Una Obra tiene muchos Movimientos de Historial
Obra.hasMany(MovimientoMaterial, { foreignKey: 'obraId' });

// Una Obra tiene muchas Partidas de Costo (ItemObra)
Obra.hasMany(ItemObra, { foreignKey: 'obraId' });
ItemObra.belongsTo(Obra, { foreignKey: 'obraId' });


// Nota: No necesitamos exportar nada desde aquí, solo importar este archivo en server.js.
console.log("Asociaciones de Sequelize definidas correctamente.");