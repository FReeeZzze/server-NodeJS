const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// Настройки
const config = require("./config/config");
const passportManager = require("./config/Passport/passport");

// Роуты
const router = require ('./routes');

// Приложение
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

app.use(config.header);
app.use(passportManager.initialize());

const MainApp = async() =>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/${config.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if(err) return console.log(err);
            console.log("Подключен к базе Mongodb: " + `${config.dbName}`);
            app.listen(config.PORT, () => {
                console.log("Сервер стартовал на порте: " + config.PORT);
            });
        });
        app.use((req, res, next) => {
            res.status(404).send("Not Found")
        });
    }catch(e) {
        console.log(e);
    }
};

MainApp().then(r => r);