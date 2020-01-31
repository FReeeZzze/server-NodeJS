const multer = require("multer");
const fs = require('fs');
let filename = null;
const rootDir = 'uploads/items';

const createDestination = (req, file, cb) => {
    filename = file.fieldname + '-' + Date.now();
    fs.mkdir(`${rootDir}/${filename}`, {recursive: false}, (err) => {
        if(err) throw err;
    });
    if (file.mimetype === ('image/jpeg' || 'image/png')) {
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
    if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};
// , fileFilter: fileFilter
const upload = multer({storage: storageConfig});

module.exports = upload;