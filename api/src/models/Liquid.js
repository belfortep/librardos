const mongoose = require('mongoose');

const LiquidSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
    },
    expiredDate: {
        type: Date,
        required: true
    },
    freeSale: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Liquid', LiquidSchema);