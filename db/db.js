//Concexión con mongoDB
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected".bgGreen.black);
  } catch (error) {
    //console.log(error);
    console.log("Error a conectar la base de datos".bgRed.black);
    process.exit(1); //Detener la app en caso de error.
  }
};

module.exports = {
  dbConnection,
};
