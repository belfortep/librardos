const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    message: {
        type: String,
    },
    father_id: {
        type: String,
        default: undefined
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
