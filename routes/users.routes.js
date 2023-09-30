//Controladores para las rutas de los usuarios
const { signUp, login, getUsers } = require("../controllers/users.controllers");
const { Router } = require("express");
// instanciando Router
const router = Router();

//Rutas para el registro y login del usuario
router.post("/signup", signUp);

router.post("/login", login);

//Ruta para listas todos los usuarios
router.get("/users", getUsers);


module.exports = router;