// crearUsuario.js
import bcrypt from "bcryptjs";
import Usuario from "./models/Usuario.js";
// Usamos la importación nombrada con llaves
import { sequelize } from "./database.js"; 

async function crearUsuario(email, password, nombre, role) {
  try {
    await sequelize.sync({ alter: true }); 

    // Hashear la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await Usuario.create({
      email,
      password: hash,
      nombre,
      // 🟢 CORRECCIÓN CLAVE: Usamos 'rol' (en español) en lugar de 'role'
      rol: role 
    });

    console.log(`✅ Usuario '${user.nombre}' creado con el ROL: ${user.rol}`);
    process.exit(0);
  } catch (err) {
    console.error("Error al crear usuario. (Verifique si el email ya existe):", err.message);
    process.exit(1);
  }
}

// --------------------------------------------------------
// 🚨 EJECUCIÓN: VALORES PARA CREAR UN NUEVO USUARIO LECTOR
// --------------------------------------------------------

// Crea un usuario Lector (solo lectura):
crearUsuario(
    "nuevo@admin.com", 
    "123456", 
    "Admin Final", 
    "admin" // 👈 Usaremos 'admin' en minúsculas para simplicidad
);
 
// // Para crear un Administrador, usa:
// crearUsuario(
//     "a@stock.com", 
//     "AdminNuevo1234", 
//     "Nuevo Administrador", 
//     "Admin" 
// );