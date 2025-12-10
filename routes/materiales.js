import express from "express";
import Material from "../models/Material.js";
import { authMiddleware } from "./auth.js";
import { hasRole, ROLES } from "../middlewares/authorization.js";

const router = express.Router();

/* ================================================
// Listar todos los materiales existentes (GET) 
//------------------------------------------------
*/
router.get(
    "/",
    authMiddleware,
    hasRole([ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER]),
    async (req, res) => {
        try {
            const materiales = await Material.findAll({
                attributes: ["id", "nombre", "unidad"]
            });
            res.json(materiales);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
);

/* ================================================
// Crear nuevo material (POST)
---------------------------------------------------
*/
router.post(
    "/",
    authMiddleware,
    hasRole([ROLES.ADMIN, ROLES.OPERATOR]),
    async (req, res) => {
        try {
            const { nombre, unidad } = req.body;

            if (!nombre) {
                return res.status(400).json({ message: "El nombre es obligatorio" });
            }

            const material = await Material.create({ nombre, unidad });
            res.json(material);
        } catch (error) {
            console.log("error al crear el material", error);
            res.status(500).json({ message: "Error al crear material" });
        }
    }
);

export default router;
