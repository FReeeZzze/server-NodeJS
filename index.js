const express = require('express');
const Config = require("./config");
const Users = require("./Routes/Users");
const mongoose = require("mongoose");

const app = express();

app.use("/users", Users);

async function MainApp () {
    try{
        await mongoose.connect("mongodb://localhost:27017/" + `${Config.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if(err) return console.log(err);
            app.listen(Config.PORT, function(){
                console.log("Сервер подключен на порте: " + Config.PORT);
            });
        });
        app.get("/", function (request, response) {
            response.send("Главная страница");
        });
        app.use(function (req, res, next) {
            res.status(404).send("Not Found")
        });
    }catch(e) {
        console.log(e);
    }
};

MainApp();