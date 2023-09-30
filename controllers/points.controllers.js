// Importando el Schema de Points
const PointsSchema = require('./../models/Points');

const getPoints = async (req, res) => {
    // Obteniendo los puntos
    try {
        // Pidiendo los puntos a la base de datos
        const points = await PointsSchema.find();
        res.json({
            points,
            status: 200,
        });
        // Si no hay puntos en la base de datos se envía un mensaje
    } catch (error) {
        res.json({
            msg: 'Error al obtener los puntos',
            status: 500,
        });
    }
};


module.exports = getPoints;