const { Schema, model } = require('mongoose');

const TruckSchema = new Schema({
    name: String,
    make: String,
    year: Number,
    color: String,
    transportWeight: Number,
    created_at: Number

});

module.exports = model('Truck', TruckSchema);