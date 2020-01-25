const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Настройки
const Config = require("./config/config");

// Роуты
const userRouter = require("./routes/UserRouter");
const homeRouter = require("./routes/HomeRouter");

// Приложение
const app = express();

app.use(Config.header);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/", homeRouter);

const MainApp = async() =>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/${Config.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if(err) return console.log(err);
            console.log("Подключен к базе Mongodb: " + `${Config.dbName}`);
            app.listen(Config.PORT, () => {
                console.log("Сервер стартовал на порте: " + Config.PORT);
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