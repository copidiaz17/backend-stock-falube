import { sequelize } from "./database.js";

try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
} catch (e) {
    console.error("Error de conexión:", e);
}
