const mongoose = require("mongoose");
const baseMaterial = require('./baseItem');
const extendSchema = require('mongoose-extend-schema');

const bookSchema = extendSchema(baseMaterial.schema,{
    publishing_house: String,
    identification: {
        ISBN: {
            type: String,
        },
        UDK: {
            type: String,
        },
        BBK: {
            type: String,
        }
    },
    about: {
        content: {
            type: String,
        },
        references: {
            type: String,
        },
        annotation: {
            type: String,
        }
    },
});

bookSchema.method({
    getISBN: function (cb) {
        console.log(cb);
    },
    getUDK: function () {

    },
    getBBK: function () {

    }
});

// console.log(bookSchema);

const Book = module.exports = mongoose.model("Book", bookSchema);

module.exports.addBook = (book, callback) => {
    Book.create(book, callback);
};

module.exports.getBooks = (callback, limit) => {
    Book.find(callback).limit(limit);
};

module.exports.getBookById = (id, callback) => {
    Book.findById(id, callback);
};

module.exports.deleteBook = (id, callback) => {
    let query = {_id: id};
    Book.deleteOne(query, callback);
};