const mongoose = require('mongoose');
const Book = require('../models/items/book.js');
const { removeFiles, downloadFiles, upDate } = require('../config/Methods');
const { addBook, editBook, workWithFiles } = require('../config/Methods/books');
const { books, video, audio } = require('../config/Types');

exports.index = (req, res) => {
    res.send('Главная страница');
};

exports.download = (req, res) => {
    const link = req.query.path;
    downloadFiles(`${link}`, res);
};

exports.uptoDate = (req, res) => {
    const id = req.body.id;
    upDate(id, res);
};

exports.addItem = (req, res) => {
    const item = req.params.item;
    const fileData = req.files;

    if (Object.keys(req.body).length === 0 || !fileData) {
        for (let i = 0; i < fileData.length; i++) {
            const path = fileData[i].path;
            removeFiles(path);
        }
        return res.send('No Content');
    }

    let base = {};
    base = workWithFiles(req, fileData, base);

    switch (item) {
        case books: {
            addBook(req, res, base).then(r => r);
            break;
        }
        case audio: {
            console.log(audio);
            break;
        }
        case video: {
            console.log(video);
            break;
        }
        default:
            res.send('No item available');
    }
};

exports.getItems = (req, res) => {
    const item = req.params.item;
    switch (item) {
        case books: {
            Book.getBooks((err, books) => {
                if (err) return console.log(err);
                res.json(books);
            });
            break;
        }
        case audio: {
            console.log(audio);
            break;
        }
        case video: {
            console.log(video);
            break;
        }
        default:
            res.send('No item available');
    }
};

exports.getItemById = (req, res) => {
    const item = req.params.item;
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id) === false) return res.send('Not valid ID');
    switch (item) {
        case books: {
            Book.getBookById(id, (err, book) => {
                if (err) return console.log(err);
                res.json(book);
            });
            break;
        }
        case audio: {
            console.log(audio);
            break;
        }
        case video: {
            console.log(video);
            break;
        }
        default:
            res.send('No item available');
    }
};

exports.getItemBy = (req, res) => {
    const item = req.params.item;
    const data = {
        extensions: req.query.extension,
        authors: req.query.authors,
        description: req.query.description,
        publishing_house: req.query.publishing_house,
        // about: {
        //     content: req.query.content,
        //     annotation: req.query.annotation,
        // },
        language: req.query.language,
    };
    console.log('LOG this: ', data);
    switch (item) {
        case books: {
            Book.getBookBy(data, (err, data) => {
                if (err) return console.log('ERR: ', err);
                res.send(data);
            });
            break;
        }
        default:
            res.send('No item available');
    }
};

exports.deleteItem = (req, res) => {
    const item = req.params.item;
    const id = req.params.id;
    let check = false;
    if (mongoose.Types.ObjectId.isValid(id) === false) return res.send('Not valid ID');
    switch (item) {
        case books: {
            Book.getBookById(id, (err, book) => {
                if (err) return console.log(err);
                if (book === null) {
                    check = false;
                    return res.send('Not found this book');
                } else {
                    check = true;
                    removeFiles(book.link);
                }
                if (check) {
                    Book.deleteBook(id, (err, book) => {
                        if (err) return console.log(err);
                        res.json(book);
                        console.log('delete from database');
                    });
                }
            });
            break;
        }
        case audio: {
            console.log(audio);
            break;
        }
        case video: {
            console.log(video);
            break;
        }
        default:
            res.send('No item available');
    }
};

exports.editItem = (req, res) => {
    const item = req.params.item;
    const fileData = req.files;

    if (Object.keys(req.body).length === 0 || !fileData) {
        for (let i = 0; i < fileData.length; i++) {
            removeFiles(fileData[i].path);
        }
        return res.send('No Content');
    }

    let base = {};
    base = workWithFiles(req, fileData, base);

    switch (item) {
        case books: {
            editBook(req, res, base);
            break;
        }
        case audio: {
            console.log(audio);
            break;
        }
        case video: {
            console.log(video);
            break;
        }
        default:
            res.send('No item available');
    }
};
