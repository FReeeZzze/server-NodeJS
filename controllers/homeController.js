const Book = require("../models/items/book.js");
const removeFiles = require("../config/Methods/methods");
const types = require("../config/Types/types");

exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.download = (req, res) => {
    const path = req.params.link;
    const file = __dirname + `/../${path}`;
    console.log(file);
    res.download(file);
};

exports.addItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (!(req.body && fileData)) return res.status(204).send("No Content");
    if(!(item === types.books || item === types.audio || item === types.video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
        return res.status(404).send("Not Found");
    }

    console.log("Загруженный Файл", fileData);

    //for all
    const extensions = fileData.originalname.split('.').pop();
    let title = 'Book New2';
    let link = req.file.path;
    let description = "#ffffff";
    let language = "ru";
    let viewsCount = 1;
    let size = req.file.size;
    let authors = 'Auth2';

    //book
    let content = '';
    let references = '';
    let annotation = '';
    let publishing_house = '';
    let ISBN = "222-333-444";
    let UDK = "2222-2222-2222";
    let BBK = "12-12-12-333-333";

    switch(item) {
        case types.books: {
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
            book.save().then((err, book) => {
                if(err) return console.log(err);
                res.json(book);
            });
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
        default: res.status(404).send("Not Found");
    }
};

exports.getItems = (req, res) => {

    const item = req.params.item;
    if(!item) return res.status(404).send("Not Found");
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
        default: res.status(404).send("Not Found");
    }
};

exports.getItemsById = (req,res) => {

    const item = req.params.item;
    const id = req.params.id;
    if(!(item  && id)) return res.status(404).send("Not Found");
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
        default: res.status(404).send("Not Found");
    }
};

exports.deleteItem = (req, res) => {

    const item = req.params.item;
    const id = req.params.id;
    if(!(item && id)) return res.status(404).send("Not Found");
    switch(item) {
        case types.books: {
            Book.getBookById(id, (err,book) => {
                if(err) return console.log(err);
                removeFiles(book.link);
            });
            Book.deleteBook(id, (err, book) => {
                if(err) return console.log(err);
                res.json(book);
                console.log('delete from database');
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
        default: res.status(404).send("Not Found");
    }
};

exports.editItem = (req, res) => {

    const item = req.params.item;
    const fileData = req.file;

    if (!(req.body && fileData)) return res.status(204).send("No Content");
    if(!(item === types.books || item === types.audio || item === types.video)) {
        const path = req.file.path;
        const file = __dirname + `/../${path}`;
        removeFiles(file);
        return res.status(404).send("Not Found");
    }

    console.log("Файл", fileData);
    //for all
    let id = '5e2f323d1db6bb1ab0139b77';
    let extensions = fileData.originalname.split('.').pop();
    let title = 'Book Update 2';
    let link = req.file.path;
    let description = "123123";
    let language = "en";
    let viewsCount = 2;
    let size = req.file.size;
    let authors = 'author1';

    //book
    let content = 'a';
    let references = 'b';
    let annotation = 'c';
    let publishing_house = 'd';
    let ISBN = "111-111-111";
    let UDK = "2222-2222-2222";
    let BBK = "12-12-12-333-333";

    switch(item) {
        case types.books: {
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
        default: res.status(404).send("Not Found");
    }
};