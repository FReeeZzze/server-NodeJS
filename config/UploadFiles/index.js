const multer = require("multer");
const fs = require('fs');
const {pdf, png, jpeg, doc, docx, ppt} = require('../Types');
let filename = null;
const rootDir = 'uploads/items';

const createDestination = (req, file, cb) => {
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
    filename = file.fieldname + '-' + Date.now() + id;
    fs.mkdir(`${rootDir}/${filename}`, {recursive: false}, (err) => {
        if(err) throw err;
    });
    if (file.mimetype === (jpeg || png)) {
        fs.mkdir(`${rootDir}/${filename}/images`, {recursive: false}, (err) => {
            if(err) throw err;
        });
        cb(null, `${rootDir}/${filename}/images`);
    } else {
        cb(null, `${rootDir}/${filename}`);
    }
};

const storageConfig = multer.diskStorage({
    destination: createDestination,
    filename: (req, file, cb) =>{
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === pdf ||
        file.mimetype === jpeg ||
        file.mimetype === png ||
        file.mimetype === doc ||
        file.mimetype === docx ||
        file.mimetype === ppt
    ){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};
const upload = multer({storage: storageConfig, fileFilter: fileFilter});

module.exports = upload;