const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

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
        name: user.name,
        email: user.email,
        password: user.password,
    };
    console.log("Update", update, "id: ", id);
    User.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteUser = (id, callback) => {
    let query = {_id: id};
    User.deleteOne(query, callback);
};