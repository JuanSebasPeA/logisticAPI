const { Schema, model } = require('mongoose');

const AuthSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});



module.exports = model('Auth', AuthSchema);