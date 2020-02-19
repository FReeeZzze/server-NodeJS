const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const author = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: String,
    },
    biography: String,
    profilePicture: String,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Author', author);
