const mongoose = require('mongoose');
const Book = require("../models/items/book.js");
const removeFiles = require("../config/Methods/methods");
const types = require("../config/Types/types");

exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.download = (req, res, next) => {
    const path = req.body.link;
    const file = __dirname + `/../${path}`;
    console.log(file);
    res.download(file);
    // res.download(file);
    // const sendFileOptions = {
    //     headers: {
    //         'X-Content-Type-Options': 'nosniff',
    //         'Content-Type'          : 'image/jpeg',
    //     },
    // };
    // res.status(200).sendFile(file, sendFileOptions, (error) => {
    //     if (error) {
    //         logger.error(error);
    //         res.status(404).send("Not found");
    //     }else {
    //         res.download(file);
    //     }
    // });
};

exports.addItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (Object.keys(req.body).length === 0 || !fileData) return res.send("No Content");
    if(!(item === types.books || item === types.audio || item === types.video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
    }

    console.log("Загруженный Файл", fileData);

    //for all
    let extensions = fileData.originalname.split('.').pop();
    let title = req.body.title;
    let link = req.file.path;
    let description = req.body.description;
    let language = req.body.language;
    let viewsCount = req.body.viewsCount;
    let size = req.file.size;
    let authors = req.body.authors;

    switch(item) {
        case types.books: {
            //book
            let content = req.body.content;
            let references = req.body.references;
            let annotation = req.body.annotation;
            let publishing_house = req.body.publishing_house;
            let ISBN = req.body.ISBN;
            let UDK = req.body.UDK;
            let BBK = req.body.BBK;
            const book = new Book({
                publishing_house: publishing_house,
                identification: {
                    ISBN: ISBN,
                    UDK: UDK,
                    BBK: BBK
                },
                about: {
                    content: content,
                    references: references,
                    annotation: annotation
                },
                title: title,
                description: description,
                language: language,
                viewsCount: viewsCount,
                size: size,
                link: link,
                extensions: extensions,
                authors: authors,
                dates: {
                    created: Date.now()
                }
            });
            book.save();
            res.send(book);
            break;
        }
        case types.audio:  {
            console.log(types.audio);
            break;
        }
        case types.video:  {
            console.log(types.video);
            break;
        }
        default: res.send("No item available");
    }
};

exports.getItems = (req, res) => {

    const item = req.params.item;
    switch(item) {
        case types.books: {
            Book.getBooks((err, books) => {
                if(err) return console.log(err);
                res.json(books);
            });
            break;
        }
        case types.audio: {
            console.log(types.audio);
            break;
        }
        case types.video: {
            console.log(types.video);
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
        case types.books: {
            Book.getBookById(id, (err, book) => {
                if(err) return console.log(err);
                res.json(book);
            });
            break;
        }
        case types.audio: {
            console.log(types.audio);
            break;
        }
        case types.video: {
            console.log(types.video);
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
        case types.books: {
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
        case types.audio: {
            console.log(types.audio);
            break;
        }
        case types.video: {
            console.log(types.video);
            break;
        }
        default: res.send("No item available");
    }
};

exports.editItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (Object.keys(req.body).length === 0 || !fileData) return res.send("No Content");
    if(!(item === types.books || item === types.audio || item === types.video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
        return res.send("No item available");
    }

    console.log("Файл", fileData);

    //for all
    let id = req.body.id;
    let extensions = fileData.originalname.split('.').pop();
    let title = req.body.title;
    let link = req.file.path;
    let description = req.body.description;
    let language = req.body.language;
    let viewsCount = req.body.viewsCount;
    let size = req.file.size;
    let authors = req.body.authors;


    switch(item) {
        case types.books: {
            //book
            let content = req.body.content;
            let references = req.body.references;
            let annotation = req.body.annotation;
            let publishing_house = req.body.publishing_house;
            let ISBN = req.body.ISBN;
            let UDK = req.body.UDK;
            let BBK = req.body.BBK;
            const newBook = {
                title: title,
                description: description,
                language: language,
                viewsCount: viewsCount,
                size: size,
                link: link,
                extensions: extensions,
                authors: authors,
                publishing_house : publishing_house,
                ISBN : ISBN,
                UDK : UDK,
                BBK: BBK,
                content : content,
                references : references,
                annotation : annotation
            };
            Book.getBookById(id, (err,book) => {
                if(err) return console.log(err);
                removeFiles(book.link);
            });
            Book.updateBook(id, newBook, {new: true, useFindAndModify: false}, (err, book) => {
                if(err) return console.log(err);
                book.markModified('update');
                res.send(book);
            });
            break;
        }
        case types.audio: {
            console.log(types.audio);
            break;
        }
        case types.video: {
            console.log(types.video);
            break;
        }
        default: res.send("No item available");
    }
};