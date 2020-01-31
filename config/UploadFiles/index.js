const multer = require("multer");
const fs = require('fs');
const {pdf, png, jpeg, doc, docx, ppt} = require('../Types');
const {createDir} = require('../Methods');
let filename = null;
let name_of_type = null;
const rootDir = 'uploads/items';

const createDestination = (req, file, cb) => {
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
    filename = file.fieldname + '-' + Date.now() + id;
    fs.mkdir(`${rootDir}/${filename}`, {recursive: false}, (err) => {
        if(err) throw err;
    });
    switch(file.mimetype) {
        case (jpeg): {
            name_of_type = 'images';
            createDir(rootDir,filename,name_of_type,cb);
            break
        }
        case (png): {
            name_of_type = 'images';
            createDir(rootDir,filename,name_of_type,cb);
            break
        }
        case (docx): {
            name_of_type = 'docs';
            createDir(rootDir,filename,name_of_type,cb);
            break
        }
        case (doc): {
            name_of_type = 'docs';
            createDir(rootDir,filename,name_of_type,cb);
            break;
        }
        case (ppt): {
            name_of_type = 'ppt';
            createDir(rootDir,filename,name_of_type,cb);
            break;
        }
        case (pdf): {
            name_of_type = 'pdf';
            createDir(rootDir,filename,name_of_type,cb);
            break;
        }
        default: cb(null, `${rootDir}/${filename}`);
    }
};

const storageConfig = multer.diskStorage({
    destination: createDestination,
    filename: (req, file, cb) =>{
        let ext = file.originalname.split('.').pop();
        cb(null, filename + '.' + ext);
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