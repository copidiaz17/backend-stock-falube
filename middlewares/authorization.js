// backend/middlewares/authorization.js

// 1. Definición Única de Roles (🛑 SIN la palabra clave 'export' aquí)
const ROLES = {
    ADMIN: 'admin',
    OPERATOR: 'operador', 
    VIEWER: 'lector' 
};


/**
 * Middleware para restringir el acceso basado en el rol del usuario.
 * (🛑 SIN la palabra clave 'export' aquí)
 */
function hasRole(allowedRoles) {
    return (req, res, next) => {
        
        if (!req.user || !req.user.rol) { 
            return res.status(403).json({ error: "Permiso denegado. Rol no definido en el token." });
        }

        // Estándar de limpieza de roles (para asegurar la comparación)
        const userRole = req.user.rol.toLowerCase().trim(); 
        const rolesToCheck = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        const lowerCaseAllowedRoles = rolesToCheck.map(role => role.toLowerCase().trim());


        if (lowerCaseAllowedRoles.includes(userRole)) {
            next(); 
        } else {
            return res.status(403).json({ error: "Permiso denegado. Su rol no tiene autorización para esta acción." });
        }1
    };
}

// 🟢 2. Exportación Final Única (Resuelve el SyntaxError)
export {
    hasRole,
    ROLES
};