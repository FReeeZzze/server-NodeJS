const mongoose = require('mongoose');
const baseMaterial = require('./baseItem');
const extendSchema = require('mongoose-extend-schema');

const bookSchema = extendSchema(
    baseMaterial.schema,
    {
        publishing_house: {
            type: String,
            default: 'none',
        },
        identification: {
            ISBN: {
                type: String,
                default: 'none',
            },
            UDK: {
                type: String,
                default: 'none',
            },
            BBK: {
                type: String,
                default: 'none',
            },
        },
        about: {
            content: {
                type: String,
                default: 'none',
            },
            references: {
                type: String,
                default: 'none',
            },
            annotation: {
                type: String,
                default: 'none',
            },
        },
    },
    { timestamps: true },
);

bookSchema.method({
    getISBN: function (cb) {
        console.log(cb);
    },
    getUDK: function () {},
    getBBK: function () {},
});

const Book = (module.exports = mongoose.model('Book', bookSchema));

module.exports.getBooks = (callback, limit) => {
    Book.find(callback).limit(limit);
};

module.exports.getBookBy = (book, callback) => {
    Book.findOne(book, callback);
};

module.exports.getBookById = (id, callback) => {
    Book.findById(id, callback);
};

module.exports.deleteBook = (id, callback) => {
    let query = { _id: id };
    Book.deleteOne(query, callback);
};

module.exports.downloadCount = (id, options, callback) => {
    let query = { _id: id };
    let update = {
        $inc: {
            downloads: 1,
        },
    };
    Book.findOneAndUpdate(query, update, options, callback);
};

module.exports.updateBook = (id, book, options, callback) => {
    let query = { _id: id };
    let update = {
        title: book.title,
        description: book.description,
        language: book.language,
        viewsCount: book.viewsCount,
        size: book.size,
        link: book.link,
        images: {
            link: book.images_link,
        },
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
            annotation: book.annotation,
        },
    };
    console.log('Update', update, 'id: ', id);
    Book.findOneAndUpdate(query, update, options, callback);
};
