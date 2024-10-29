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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Community', CommunitySchema);
