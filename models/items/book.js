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
}, {timestamps: true});

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

module.exports.updateBook = (id, book, options, callback) => {
    let query = {_id: id};
    let update = {
        title: book.title,
        description: book.description,
        language: book.language,
        viewsCount: book.viewsCount,
        size: book.size,
        link: book.link,
        extensions: book.extensions,
        authors: book.authors,
        publishing_house: book.publishing_house,
        identification: {
            ISBN: book.ISBN,
            UDK: book.UDK,
            BBK: book.BBK,
        },
        about: {
            content: book.content,
            references: book.references,
            annotation: book.annotation
        }
    };
    console.log("Update", update, "id: ", id);
    Book.findOneAndUpdate(query, update, options, callback);
};