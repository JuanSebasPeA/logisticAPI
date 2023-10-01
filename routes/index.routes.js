// Configuración de las rutas
const { Router } = require('express');

//Importando el controlador de los puntos
const getPoints = require('../controllers/points.controllers');
//Importando el controlador de los camiones
const getTrucks = require('../controllers/trucks.controllers');


//Importando el middleware para verificar el token
const verifyToken = require('../services/userLogged');

const router = Router();

//Ruta principal
router.get('/', (req, res) => {
    res.json({ 
        message: 'Main Route',
        endpoints: [
            "/api/users",
            "/api/points"
        ] 
    });
});

// Ruta para ver los points
router.get('/points', verifyToken, getPoints);
//Ruta para ver los trucks
router.get('/trucks', verifyToken, getTrucks);


// Ruta para crear un point


module.exports = router;