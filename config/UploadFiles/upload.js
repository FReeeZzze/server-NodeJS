const multer = require("multer");
const fs = require('fs');
let filename = null;
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        filename = file.fieldname + '-' + Date.now();
        fs.mkdir(`uploads/items/${filename}`, {recursive: false}, (err) => {
            if(err) throw err;
        });
        cb(null, `uploads/items/${filename}`);
    },
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

const upload = multer({storage: storageConfig, fileFilter: fileFilter});

module.exports = upload;