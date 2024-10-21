const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        unique: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);