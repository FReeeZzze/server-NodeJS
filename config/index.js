const header = require('./Header');
const upload = require('./UploadFiles');

//Общие настройки
module.exports = {
    'secret': 'eLibS4_bv',
    'PORT': 5000,
    'dbName': "elib_database",
    'maxCount': '2',
    header,
    upload,
};

