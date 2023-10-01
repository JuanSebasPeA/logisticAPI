const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    orderType: {
        type: String,
    },
    description: {
        type: String,
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    },
    status: {
        type: String,
    },
    truck: {
        type: Schema.Types.ObjectId,
        ref: 'Truck'
    },
})


module.exports = model('Order', OrderSchema);