const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            // Obtener el token del header de autorización
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Verificar si el rol del usuario está en los roles permitidos
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
            }

            next();
        } catch (error) {
            res.status(401).json({ error: 'Autenticación fallida' });
        }
    };
};

module.exports = authMiddleware;
