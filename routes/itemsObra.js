import express from 'express';
// Asegúrate de que estas rutas de importación sean correctas:
import ItemObra from '../models/ItemObra.js'; 
import { authMiddleware } from './auth.js'; 

// 🟢 NUEVAS IMPORTACIONES DE SEGURIDAD
import { hasRole, ROLES } from "../middlewares/authorization.js";

const router = express.Router();

/* ================================================
   LÓGICA DEL CONTROLLER: CREAR ÍTEM DE OBRA
   (POST /api/items-obra) - RESTRINGIDO: Solo Admin, Operador
   ================================================ */
export async function createItemObra(req, res) {
    const { obraId, nombre, codigo } = req.body; 

    try {
        if (!obraId || !nombre) {
            return res.status(400).json({ message: "La Obra ID y el Nombre del Ítem son obligatorios." });
        }

        const newItem = await ItemObra.create({ obraId, nombre, codigo });
        res.status(201).json(newItem);

    } catch (error) {
        console.error("Error al crear Ítem de Obra:", error);
        
        // Manejo específico del error de restricción única (obraId + nombre)
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ message: "Ya existe un ítem con ese nombre en esta obra." });
        }
        res.status(500).json({ message: "Error interno del servidor al crear Ítem de Obra." });
    }
}

/* ================================================
   LÓGICA DEL CONTROLLER: OBTENER ÍTEMS POR OBRA
   (GET /api/obras/:obraId/items) - PERMITIDO: Todos
   ================================================ */
export async function getItemsByObra(req, res) {
    // La obraId se obtiene de los parámetros de la URL
    const { obraId } = req.params; 

    try {
        const items = await ItemObra.findAll({
            where: { obraId },
            attributes: ['id', 'nombre', 'codigo'], // Solo enviamos los datos necesarios
            order: [['nombre', 'ASC']]
        });
        res.status(200).json(items);

    } catch (error) {
        console.error("Error al obtener Ítems de Obra:", error);
        res.status(500).json({ message: "Error al obtener Ítems de Obra." });
    }
}


/* ================================================
   DEFINICIÓN DE RUTAS
   ================================================ */

// POST /api/items-obra (Crear nuevo ítem)
router.post('/', authMiddleware, hasRole([ROLES.ADMIN, ROLES.OPERATOR]), createItemObra); // 👈 RESTRICCIÓN

// GET /api/obras/:obraId/items (Obtener ítems de una obra específica)
router.get('/:obraId/items', authMiddleware, hasRole([ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER]), getItemsByObra); // 👈 PERMISO PARA LECTOR

export default router;