const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const errF = require('./errors/errors');

// Настройки
const { header, PORT, dbName, HOST } = require('./config');
const passportManager = require('./config/Passport/passport');

// Роуты
const router = require('./routes');

// Приложение
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);
app.use(express.static('uploads'));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    errF(err.message, res);
});

app.use(header);
app.use(passportManager.initialize());

const MainApp = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) return console.log(err);
            console.log(`Подключен к базе Mongodb: ${dbName}`);
            app.listen(PORT, HOST, () => {
                console.log(`Сервер стартовал: http://${HOST}:${PORT}`);
            });
        });
        // eslint-disable-next-line no-unused-vars
        app.use((req, res, next) => {
            res.status(404).send('Not Found');
        });
    } catch (err) {
        console.log(err);
    }
};

MainApp().then((r) => r);
