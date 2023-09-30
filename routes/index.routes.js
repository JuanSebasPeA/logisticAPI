// Configuración de las rutas
const { Router } = require('express');

const router = Router();

//Ruta principal
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});


module.exports = router;