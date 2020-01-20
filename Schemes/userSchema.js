const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    created: Date
});

module.exports = mongoose.model("User", userSchema);