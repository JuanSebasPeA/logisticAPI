// Configuración de las rutas
const { Router } = require('express');

//Importando el controlador de los puntos
const getPoints = require('../controllers/points.controllers');
//Importando el controlador de los camiones
const getTrucks = require('../controllers/trucks.controllers');
//Importando el controaldor de las rutas
const { createRoute, modifyRoute, getRoutes, deleteRoute, getRoutesInfo } = require('../controllers/routes.controller');

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

//Ruta para ver las rutas
router.get('/routes', verifyToken, getRoutes);
//Ruta para crear una ruta
router.post('/routes', verifyToken, createRoute);
//Ruta para modificar una ruta
router.put('/routes/:id', verifyToken, modifyRoute);
//Ruta para eliminar una ruta
router.delete('/routes/:id', verifyToken, deleteRoute);
//Ruta para ver la información de las rutas
router.get('/routes/info', verifyToken, getRoutesInfo);



module.exports = router;