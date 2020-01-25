const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        firstName: {
            type: String,
            default: "Noname"
        },
        lastName: String
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model("User", user);

module.exports.getUsers = (callback, limit) => {
    User.find(callback).limit(limit);
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.addUser = (user, callback) => {
    User.create(user, callback);
};

module.exports.updateUser = (id, user, options, callback) => {
    let query = {_id: id};
    let update = {
        name: {
            firstName: user.firstName,
            lastName: user.lastName
        },
        password: user.password,
    };
    console.log("Update", update, "id: ", id);
    User.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteUser = (id, callback) => {
    let query = {_id: id};
    User.deleteOne(query, callback);
};