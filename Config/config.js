const toClient = require('./Header/header');
const upload = require('./UploadFiles/upload');

//Общие настройки
const PORT = 5000;
const dbName = "elib_database";

module.exports = {
    toClient,
    upload,
    PORT,
    dbName,
};

