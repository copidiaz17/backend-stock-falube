// server.js
import express from "express";
import cors from "cors";

// Importación de la conexión a la DB
import { sequelize } from "./database.js"; 

// ===============================================
// 1. IMPORTAR MODELOS (definen la estructura de la tabla)
// ===============================================
import "./models/Usuario.js"; 
import "./models/Obra.js";
import "./models/Material.js";
import "./models/MaterialObra.js";
import "./models/ItemObra.js"; 
import "./models/MovimientoMaterial.js"; 

// 2. IMPORTAR ASOCIACIONES (definen relaciones)
import "./models/associations.js"; 

// 3. IMPORTAR RUTAS
import authRoutes from "./routes/auth.js";
import obrasRoutes from "./routes/obras.js";
import materialesRoutes from "./routes/materiales.js";
import itemsObraRoutes from "./routes/itemsObra.js"; 

const app = express();
const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Habilitar CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ===============================================
// MONTAJE DE RUTAS
// ===============================================
app.use("/auth", authRoutes);
app.use("/materiales", materialesRoutes);
app.use("/obras", obrasRoutes);
app.use("/items-obra", itemsObraRoutes); 

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Backend funcionando correctamente");
});

// 🟢 MANEJADOR GLOBAL DE ERRORES
app.use((err, req, res, next) => {
    console.error("\n===========================================");
    console.error("⛔ FATAL UNHANDLED ERROR EN EXPRESS ⛔");
    console.error(err.stack); 
    console.error("===========================================\n");
    
    res.status(500).send({ message: "Error interno del servidor no manejado." });
});

// 🔥 CONECTAR A BASE DE DATOS (sin sincronizar tablas)
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la DB establecida correctamente. Tablas existentes usadas.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error conectando a la DB:", err);
  });
