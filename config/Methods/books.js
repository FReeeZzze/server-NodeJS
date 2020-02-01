const Book = require("../../models/items/book.js");
const {removeFiles} = require("../../config/Methods");

exports.addBook = (req, res, base) => {
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
        title: base.title,
        description: base.description,
        language: base.language,
        viewsCount: base.viewsCount,
        size: base.size,
        link: base.link,
        extensions: base.extensions,
        authors: base.authors,
    });
    book.save();
    res.send(book);
};

exports.editBook = (req, res, base) => {
    let content = req.body.content;
    let references = req.body.references;
    let annotation = req.body.annotation;
    let publishing_house = req.body.publishing_house;
    let ISBN = req.body.ISBN;
    let UDK = req.body.UDK;
    let BBK = req.body.BBK;
    const newBook = {
        title: base.title,
        description: base.description,
        language: base.language,
        viewsCount: base.viewsCount,
        size: base.size,
        link: base.link,
        extensions: base.extensions,
        authors: base.authors,
        publishing_house : publishing_house,
        ISBN : ISBN,
        UDK : UDK,
        BBK: BBK,
        content : content,
        references : references,
        annotation : annotation
    };
    Book.getBookById(base.id, (err,book) => {
        if(err) return console.log(err);
        removeFiles(book.link);
    });
    Book.updateBook(base.id, newBook, {new: true, useFindAndModify: false}, (err, book) => {
        if(err) return console.log(err);
        book.markModified('update');
        res.send(book);
    });
};