const Book = require('../../models/items/book.js');
const { removeFiles } = require('./index');
const { editString } = require('../Methods/manipulations');
const { docx, doc, pdf } = require('../../config/Types');
const { server } = require('../../config');
const fs = require('fs-extra');

exports.addBook = async (req, res, base) => {
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
            BBK: BBK,
        },
        about: {
            content: content,
            references: references,
            annotation: annotation,
        },
        downloads: 0,
        title: base.title,
        description: base.description,
        language: base.language,
        viewsCount: base.viewsCount,
        size: base.size,
        link: base.link,
        images: {
            link: base.images_link,
        },
        extensions: base.extensions,
        authors: base.authors,
    });
    await book.save();
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
        images_link: base.images_link,
        size: base.size,
        link: base.link,
        extensions: base.extensions,
        authors: base.authors,
        publishing_house: publishing_house,
        ISBN: ISBN,
        UDK: UDK,
        BBK: BBK,
        content: content,
        references: references,
        annotation: annotation,
    };
    // Найти обновляемую книгу по id и удалить её к чертям ^_^
    Book.getBookById(base.id, (err, book) => {
        if (err) return console.log(err);
        removeFiles(book.link);
    });

    Book.updateBook(base.id, newBook, { new: true, useFindAndModify: false }, (err, book) => {
        if (err) return console.log(err);
        book.markModified('update');
        res.send(book);
    });
};

module.exports.workWithFiles = (req, fileData, base) => {
    let main_dir = null;
    let image_link = null;
    let temp;
    let dest = [];

    // Добавить в общую копилку из body
    Object.assign(base, {
        title: req.body.title,
        description: req.body.description,
        language: 'ru', // когда на фронте будет сделано работа со сменой языка, здесь будет -  req.body.language
        viewsCount: 0, // когда на фронте будет сделано просмотры, здесь будет -  req.body.viewsCount
        authors: req.body.authors,
    });

    for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].mimetype === docx || fileData[i].mimetype === doc || fileData[i].mimetype === pdf) {
            // Основная директория будет такой где находиться файл DOCX/DOC/PDF.

            main_dir = editString(fileData[i].destination, '/', 0, 3);
            // Добавить всё что связано с файлом DOCX/DOC/PDF...
            Object.assign(base, {
                extensions: fileData[i].originalname.split('.').pop(),
                link: fileData[i].path,
                size: fileData[i].size,
            });
            // если id есть то добавляем его в общую копилку (для обновления данных) /editItem
            if (req.body.id !== undefined) Object.assign(base, { id: req.body.id });
        } else {
            // Добавить в другой пул файлы не связанные по условию выше
            dest.push(fileData[i].path);
            image_link = editString(fileData[i].path, '\\', 3, 2);
        }
    }
    if (main_dir !== null) {
        for (let i = 0; i < dest.length; i++) {
            // Переносим файлы из другого пула в основную директорию, хуле нам программистам...мы всё любим складировать в одной.
            main_dir += '\\' + editString(dest[i], '\\', 3, 4);
            fs.move(dest[i], main_dir, function (err) {
                if (err) return console.error(err);
                removeFiles(dest[i]);
            });
        }
        // добавляем ссылку изображения (пример) -  сервер/ссылка_на_изображение_bitch
        temp = server + '\\' + editString(base.link, '\\', 1, 2) + '\\' + image_link;
        Object.assign(base, { images_link: temp });
    } else console.log('NOTHING TO DO');

    return base;
};
