const express = require("express");
const homeController = require("./../controllers/homeController.js");
const {upload, maxCount} = require("../config");

const type = upload.single("filedata"); // для загрузки одного файла
const multiType = upload.array("filedata", maxCount); // сколько файлов можно загрузить
const homeRouter = express.Router(); // для адресов с "/"


//get запросы
homeRouter.get("/",homeController.index);
homeRouter.get("/items/:item", homeController.getItems);
homeRouter.get('/download', homeController.download);
homeRouter.get("/:item/id/:id", homeController.getItemsById);

//post запросы
homeRouter.post("/add/:item", multiType, homeController.addItem);

//put запросы
homeRouter.put("/edit/:item", multiType, homeController.editItem);

//delete запросы
homeRouter.delete("/delete/:item/id/:id", homeController.deleteItem);

module.exports = homeRouter;