// server.js
import express from "express";
import cors from "cors";

import { sequelize } from "./database.js"; 

import "./models/Usuario.js"; 
import "./models/Obra.js";  
import "./models/Material.js";
import "./models/MaterialObra.js";
import "./models/ItemObra.js"; 
import "./models/MovimientoMaterial.js"; 

import "./models/associations.js"; 

import authRoutes from "./routes/auth.js";
import obrasRoutes from "./routes/obras.js";
import materialesRoutes from "./routes/materiales.js";
import usuariosRoutes from "./routes/usuarios.js";




const app = express();

// Render te da dinámicamente el puerto
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://frontend-stok-falube.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/materiales", materialesRoutes);
app.use("/obras", obrasRoutes);
app.use("/usuarios", usuariosRoutes);


app.get("/", (req, res) => {
  res.send("Servidor Backend funcionando correctamente");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Error interno del servidor" });
});

sequelize.authenticate()
  .then(() => {
    console.log("Conectado a DB correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
