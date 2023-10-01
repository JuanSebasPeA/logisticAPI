const TruckSchema = require('../models/Trucks');

//Controlador para listar todos los trucks
const getTrucks = async (req, res) => {
    try {
        const trucks = await TruckSchema.find();
        res.json(trucks);
    } catch (error) {
        res.json(error);
    }
};


module.exports = getTrucks;