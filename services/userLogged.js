const jwt = require('jsonwebtoken');

//Esta función obtiene el token del header de la petición y si un token válido se hace un next
function verifyToken(req, res, next) {
    // Obteniendo el token del header de la petición
    const tokenObtained = req.headers['authorization'];
    // se verifica si el token existe y si este es válido y está activo, si es así se agrega a los tokens activos
    const validToken = jwt.verify(tokenObtained, process.env.SECRET_KEY);
    if (!validToken) {
        return res.status(401).json({
            msg: "Token no válido",
            status: 401,
        });
    }
    // Se agrega el token a los tokens activos
    req.token = tokenObtained;
    next();

} // cierre de la fucnión


module.exports = verifyToken;