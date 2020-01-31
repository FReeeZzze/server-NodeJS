const mongoose = require('mongoose');
const Book = require("../models/items/book.js");
const {removeFiles, downloadFiles} = require("../config/Methods");
const {addBook} = require("../config/Methods/books");
const {books, video, audio} = require("../config/Types");
const {editBook} = require("../config/Methods/books");

exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.test = (req, res) => {
    const Files = req.files;
    res.send(Files);
};

exports.download = (req, res, next) => {

    if (Object.keys(req.body).length === 0) return res.send("No Content");
    const link = req.body.link;
    const file = __dirname + `/../${link}`;
    downloadFiles(file, res);
};

exports.addItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (Object.keys(req.body).length === 0 || !fileData) return res.send("No Content");
    if(!(item === books || item === audio || item === video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
    }

    console.log("Загруженный Файл", fileData);

    //for all
    let base = {
        extensions: fileData.originalname.split('.').pop(),
        title: req.body.title,
        link: req.file.path,
        description: req.body.description,
        language: req.body.language,
        viewsCount: req.body.viewsCount,
        size: req.file.size,
        authors: req.body.authors
    };
    switch(item) {
        case books: {
            addBook(req, res, base);
            break;
        }
        case audio:  {
            console.log(audio);
            break;
        }
        case video:  {
            console.log(video);
            break;
        }
        default: res.send("No item available");
    }
};

exports.getItems = (req, res) => {

    const item = req.params.item;
    switch(item) {
        case books: {
            Book.getBooks((err, books) => {
                if(err) return console.log(err);
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
        default: res.send("No item available");
    }
};

exports.getItemsById = (req, res) => {

    const item = req.params.item;
    const id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id) === false) return res.send("Not valid ID");
    switch(item) {
        case books: {
            Book.getBookById(id, (err, book) => {
                if(err) return console.log(err);
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
        default: res.send("No item available");
    }
};

exports.deleteItem = (req, res) => {

    const item = req.params.item;
    const id = req.params.id;
    let check = false;
    if(mongoose.Types.ObjectId.isValid(id) === false) return res.send("Not valid ID");
    switch(item) {
        case books: {
            Book.getBookById(id, (err,book) => {
                if(err) return console.log(err);
                if(book === null) {
                    check = false;
                    res.send("Not found this book");
                }else {
                    check = true;
                    removeFiles(book.link);
                }
                if(check) {
                    Book.deleteBook(id, (err, book) => {
                        if(err) return console.log(err);
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
        default: res.send("No item available");
    }
};

exports.editItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (Object.keys(req.body).length === 0 || !fileData) return res.send("No Content");
    if(!(item === books || item === audio || item === video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
        return res.send("No item available");
    }

    console.log("Файл", fileData);

    //for all
    let base = {
        id: req.body.id,
        extensions: fileData.originalname.split('.').pop(),
        title: req.body.title,
        link: req.file.path,
        description: req.body.description,
        language: req.body.language,
        viewsCount: req.body.viewsCount,
        size: req.file.size,
        authors: req.body.authors
    };

    switch(item) {
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
        default: res.send("No item available");
    }
};