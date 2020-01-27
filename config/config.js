const header = require('./Header/header');
const upload = require('./UploadFiles/upload');

//Общие настройки
const PORT = 5000; // Порт на котором находиться сервер
const dbName = "elib_database"; // название Базы данныъх
let medata = new Date();
const DateNow = medata.toLocaleTimeString().split(":").slice(0, -1).join(':');
module.exports = {
    DateNow,
    header,
    upload,
    PORT,
    dbName,
};

