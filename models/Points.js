const { Schema, model } = require('mongoose');

const PointsSchema = Schema({
    "location": {
        "name": {
            type: String,
            required: true,
        },
        "pacedId": {
            type: String,
            required: true,
        },
    }
});

module.exports = model('Points', PointsSchema);
