const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const bcrJS = require('bcryptjs'), SALT_WORK_FACTOR = 10;
const user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    email: String,
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

user.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrJS.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrJS.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

user.methods.comparePassword = function(candidatePassword, cb) {
    bcrJS.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

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