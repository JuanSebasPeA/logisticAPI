/* La colección de rutas estará formada por dos puntos de la colección de Points. Esta colección tendrá por
lo tanto dos puntos como atributos. */
const { Schema, model } = require('mongoose');

const RouteSchema = new Schema({
    points: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Points'
        }
    ]
}, {
    timestamps: true
});


module.exports = model('Route', RouteSchema);
