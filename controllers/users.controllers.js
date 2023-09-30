//Creando los controladores para el registro y el login del usuario
const AuthSchema = require("../models/Auth");
// Modulo para poder encriptar la contraseña
const bcrypt = require("bcrypt");
// Módulo para generar o firmar el token
const jwt = require("jsonwebtoken");
//Módulo para importar las variables de entorno
require("dotenv").config();

const signUp = async (req, res) => {
  const { email, password } = req.body;
  // Se busca en la base de datos se ya hay un usuario con ese email
  const user = await AuthSchema.findOne({ email });
  // Si ya existe un usuario con ese email significa que el registro no se puede realizar de nuevo
  if (user) {
    return res.status(400).json({
      msg: "El usuario ya existe",
      status: 400,
    });
  }

  // Se encripta la contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Si no existe el usuario se crea uno nuevo
  const newUser = new AuthSchema({
    email,
    password: passwordHash,
  });
  // Se guarda el usuario en la base de datos
  const userSaved = await newUser.save();
  console.log(`Usuario creado: ${userSaved} \n`);
  // Se devuelve el usuario creado
  res.status(201).json({
    msg: "Usuario creado",
    status: 201,
    userSaved,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Sebusca en la base de datos si el usuario y la contraseña existen
  const user = await AuthSchema.findOne({ email });

  console.log(`Usuario encontrado: ${user} \n`);

  if (!user) {
    return res.status(400).json({
      msg: "El usuario no existe",
      status: 400,
    });
  }
  // Se compara la contraseña con la que se encuentra en la base de datos
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "La contraseña es incorrecta",
      status: 400,
    });
  }
  // se crean las credenciales para el token
  const userForToken = {
    email: user.email,
    id: user._id,
  };

  //Creando el token con el id y el email del usuario
  const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
    // El token expira en 1 hora
    expiresIn: 60 * 60,
  });
  
  

  // Se devuelve el token
  res.status(200).json({
    msg: "Usuario loggeado correctamente",
    status: 200,
    credentials: userForToken,
    token,
  });
};


//Controlador para devolver todos los usuarios
const getUsers = async (req, res) => {
  const users = await AuthSchema.find();
  res.json(users);
};


module.exports = {
  signUp,
  login,
  getUsers,
};
