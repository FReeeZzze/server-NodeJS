const header = require('./Header/header');
const upload = require('./UploadFiles/upload');

//Общие настройки
module.exports = {
    'secret': 'eLibS4_bv',
    'PORT': 5000,
    'dbName': "elib_database",
    header,
    upload,
};

