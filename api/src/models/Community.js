const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        min: 3,
        max: 25
    },
    book: {
        type: String,
        require: true,
    },
    users: {
        type: Array,
        default: []
    },
    // TODO, deberiamos crear un modelo "mensaje" y guardar las ids de estos, por ahora solo guardamos texto
    messages: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Community', CommunitySchema);
