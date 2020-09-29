const fs = require('fs-extra');
const Book = require('../../models/items/book');
const { editString } = require('../Methods/manipulations');

exports.removeFiles = (params) => {
    // eslint-disable-next-line no-undef
    const dir = editString(__dirname, '\\', 0, 4) + `\\${editString(params, '\\', 0, 3)}`;
    console.log('\n del dir: ', dir);
    fs.remove(dir, function (err) {
        if (err) return console.log(err);
        console.log('\n - - files and directory deleted successfully - - ');
    });
};

exports.upDate = (id, res) => {
    Book.downloadCount(id, { new: true, useFindAndModify: false }, (err, book) => {
        if (err) console.log('error', err);
        book.markModified('update');
        res.send(book);
    });
};

exports.downloadFiles = (link, res) => {
    // eslint-disable-next-line no-unused-vars
    fs.stat(link, function (err, stat) {
        if (err == null) {
            // file exist
            const filename = link.split('\\').pop();
            res.download(link, filename, () => {
                console.log('download complete!');
            });
        } else if (err.code === 'ENOENT') {
            // file does not exist
            // eslint-disable-next-line no-unused-vars
            fs.writeFile('download-logs.txt', err, function (err, result) {
                if (err) console.log('error', err);
                res.send('FILE DOES NOT EXIST!');
            });
        } else {
            console.log('Some other error: ', err.code);
            res.send('Undefined error');
        }
    });
};

exports.createDir = (rootDir, filename, name_of_type, cb) => {
    const DIR = `${rootDir}/${filename}/${name_of_type}`;
    fs.mkdir(DIR, { recursive: false }, (err) => {
        if (err) {
            console.log('createDir err: ', err);
            throw err;
        }
        cb(null, DIR);
    });
};
