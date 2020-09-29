const multer = require('multer');
const fs = require('fs-extra');
const { pdf, png, jpeg, doc, docx, ppt } = require('../Types');
const { createDir } = require('../Methods');
let filename = null;
const rootDir = 'uploads/items';

const createDestination = (req, file, cb) => {
    try {
        const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
        filename = file.fieldname + '-' + Date.now() + id;

        fs.mkdir(`${rootDir}/${filename}`, { recursive: false }, (err) => {
            if (err) {
                console.log('mkdir-CreateDist: ', err.message);
                throw err;
            }
        });
        switch (file.mimetype) {
            case jpeg: {
                createDir(rootDir, filename, 'images', cb);
                break;
            }
            case png: {
                createDir(rootDir, filename, 'images', cb);
                break;
            }
            case docx: {
                createDir(rootDir, filename, 'docs', cb);
                break;
            }
            case doc: {
                createDir(rootDir, filename, 'docs', cb);
                break;
            }
            case ppt: {
                createDir(rootDir, filename, 'ppt', cb);
                break;
            }
            case pdf: {
                createDir(rootDir, filename, 'pdf', cb);
                break;
            }
            default:
                cb(null, `${rootDir}/${filename}`);
        }
    } catch (err) {
        console.log('THIS ERR: ', err);
    }
};

const storageConfig = multer.diskStorage({
    destination: createDestination,
    filename: (req, file, cb) => {
        cb(null, filename + '.' + file.originalname.split('.').pop());
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === pdf || file.mimetype === jpeg || file.mimetype === png || file.mimetype === doc || file.mimetype === docx || file.mimetype === ppt) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storageConfig, fileFilter: fileFilter });

module.exports = upload;
