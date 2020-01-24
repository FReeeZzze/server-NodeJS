const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype === "application/pdf"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload = multer({storage: storageConfig, fileFilter: fileFilter});

module.exports = upload;