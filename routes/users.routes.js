//Controladores para las rutas de los usuarios
const { signUp, login } = require("../controllers/users.controllers");
const { Router } = require("express");
// instanciando Router
const router = Router();

//Rutas para el registro y login del usuario
router.post("/signup", signUp);

router.post("/login", login);


module.exports = router;