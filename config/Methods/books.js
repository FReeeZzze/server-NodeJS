const Book = require("../../models/items/book.js");
const {removeFiles} = require("../../config/Methods");
const {docx, doc, pdf} = require("../../config/Types");
const {server} = require("../../config");
const fs = require('fs-extra');

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
        images: {
            link: base.images_link
        },
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

exports.workWithFiles = (req, fileData, base) => {
    let main_dir = null;
    let image_link = null;
    let temp;
    let dest = [];
    for(let i = 0; i < fileData.length; i++){
        if(fileData[i].mimetype === docx || fileData[i].mimetype === doc || fileData[i].mimetype === pdf){
            main_dir = fileData[i].destination.split('/').splice(0,3).join('/');
            //for all
            Object.assign(base, {
                extensions: fileData[i].originalname.split('.').pop(),
                title: req.body.title,
                link: fileData[i].path,
                description: req.body.description,
                language: req.body.language,
                viewsCount: req.body.viewsCount,
                size: fileData[i].size,
                authors: req.body.authors
            });
            if(req.body.id !== undefined) Object.assign(base, {id: req.body.id});
        }else {
            dest.push(fileData[i].path);
            image_link = fileData[i].path.split('\\').splice(3,2).join('/');
        }
    }
    for(let i = 0; i < dest.length; i++){
        main_dir += '/' + dest[i].split('\\').splice(3,4).join('/');
        fs.move(dest[i], main_dir,  function (err) {
            if (err) return console.error(err);
            removeFiles(dest[i])
        });
    }

    temp = server + '/' + base.link.split('\\').splice(1,2).join('/') + '/' + image_link;
    Object.assign(base, {images_link: temp});
    return base;
};