const express = require("express");
const homeController = require("./../controllers/homeController.js");
const Config = require("../config/config");

const type = Config.upload.single("filedata");
const multiType = Config.upload.array("filedata", 2); // сколько файлов можно загрузить
const homeRouter = express.Router(); // для адресов с "/"

homeRouter.post('/test/upload', multiType, homeController.test);

//get запросы
homeRouter.get("/",homeController.index);
homeRouter.get("/items/:item", homeController.getItems);
homeRouter.get('/download', homeController.download);
homeRouter.get("/:item/id/:id", homeController.getItemsById);

//post запросы
homeRouter.post("/add/:item", type, homeController.addItem);

//put запросы
homeRouter.put("/edit/:item", type, homeController.editItem);

//delete запросы
homeRouter.delete("/delete/:item/id/:id", homeController.deleteItem);
module.exports = homeRouter;