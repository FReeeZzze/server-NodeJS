const header = require('./Header/header');
const upload = require('./UploadFiles/upload');

//Общие настройки
const PORT = 5000; // Порт на котором находиться сервер
const dbName = "elib_database"; // название Базы данныъх

module.exports = {
    header,
    upload,
    PORT,
    dbName,
};

