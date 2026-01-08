import express from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { authMiddleware } from "./auth.js";
import { hasRole, ROLES } from "../middlewares/authorization.js";

const router = express.Router();

/**
 * POST /usuarios
 * Crear usuario (SOLO ADMIN)
 */
router.post(
  "/",
  authMiddleware,
  hasRole(ROLES.ADMIN),
  async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;

      if (!nombre || !email || !password || !rol) {
        return res.status(400).json({
          message: "Todos los campos son obligatorios"
        });
      }

      const usuarioExistente = await Usuario.findOne({
        where: { email }
      });

      if (usuarioExistente) {
        return res.status(400).json({
          message: "El email ya está registrado"
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password: passwordHash,
        rol
      });

      res.status(201).json({
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      });

    } catch (error) {
      console.error("Error creando usuario:", error);
      res.status(500).json({
        message: "Error interno del servidor"
      });
    }
  }
);

export default router;
