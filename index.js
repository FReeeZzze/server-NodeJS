const express = require('express');
const mongoose = require("mongoose");
const Config = require("./config");
const userRouter = require("./Routes/UserRouter");
const homeRouter = require("./Routes/HomeRouter");

const app = express();

app.use("/users", userRouter);
app.use("/", homeRouter);

async function MainApp () {
    try{
        await mongoose.connect("mongodb://localhost:27017/" + `${Config.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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

MainApp();