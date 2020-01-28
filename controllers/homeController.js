const Book = require("../models/items/book.js");
const removeFiles = require("../config/Methods/methods");

exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.download = (req, res) => {
    const path = req.link;
    const file = __dirname + `/../${path}`;
    console.log(file);
    res.download(file);
};

exports.addItem = (req, res, next) => {

    if (!(req.body && req.file)) return res.status(404).send("Not Found");

    const fileData = req.file;

    if(!fileData)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");

    console.log("Файл", fileData);
    const ext = fileData.originalname.split('.').pop();
    console.log("Формат: ",ext);

    //for all
    let title = 'Book New';
    let link = req.file.path;
    let description = "123123";
    let language = "ru";
    let viewsCount = 1;
    let size = req.file.size;
    let authors = 'author1';

    //book
    let content = '';
    let references = '';
    let annotation = '';
    let publishing_house = '';
    let ISBN = "111-111-111";
    let UDK = "2222-2222-2222";
    let BBK = "12-12-12-333-333";

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
        extensions: ext.toString(),
        authors: authors,
    });
    book.save().then((err, book) => {
        if(err) return console.log(err);
        res.json(book);
    });
};

module.exports.getItems = (req, res) => {

    const item = req.params.item;
    if(item === 'books'){
        Book.getBooks((err, books) => {
            if(err) return console.log(err);
            res.json(books);
        });
    }else {
        res.status(404).send("Not Found");
    }
};

exports.getItemsById = (req,res) => {

    const item = req.params.item;
    const id = req.params.id;
    if(item === 'books'){
        Book.getBookById(id, (err, book) => {
            if(err) return console.log(err);
            res.json(book);
        });
    }else {
        res.status(404).send("Not Found");
    }
};

exports.deleteItem = (req, res) => {

    const item = req.params.item;
    const id = req.params.id;
    if(item === 'books'){
        Book.getBookById(id, (err,book) => {
            if(err) return console.log(err);
            removeFiles(book.link);
        });
        Book.deleteBook(id, (err, book) => {
            if(err) return console.log(err);
            res.json(book);
            console.log('delete from database');
        });
    }else {
        res.status(404).send("Not Found")
    }
};

exports.editItem = (req, res) => {

    if(!(req.item && (req.body && req.file))) return res.status(404).send("Not Found");

    const fileData = req.file;

    if(!fileData)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");

    //base
    const item = req.params.item;
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const language = req.body.language;
    const viewsCount = req.body.viewsCount;
    const size = req.file.size;
    const link = req.file.path;
    const extensions = '';
    const authors = '';
    if(item === 'books'){

    }
};