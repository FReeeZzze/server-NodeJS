const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const errors = new Schema(
    {
        code: {
            type: String,
            unique: true,
        },
        error: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true },
);

const Errors = (module.exports = mongoose.model('Errors', errors));

module.exports.getErrors = (callback, limit) => {
    Errors.find(callback).limit(limit);
};

module.exports.addError = (err, callback) => {
    Errors.create(err, callback);
};

module.exports.find = (err, callback) => {
    console.log(err);
    Errors.findOne(err, callback);
};
