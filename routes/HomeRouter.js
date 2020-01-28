const express = require("express");
const homeController = require("./../controllers/homeController.js");
const Config = require("../config/config");

const type = Config.upload.single("filedata");
const homeRouter = express.Router();

//get запросы
homeRouter.get("/",homeController.index);
homeRouter.get("/items/:item", homeController.getItems);
homeRouter.get('/download', homeController.download);
homeRouter.get("/:item/:id", homeController.getItemsById);

//post запросы
homeRouter.post("/add/:item", type, homeController.addItem);

//put запросы
homeRouter.put("/edit/:item", type, homeController.editItem);

//delete запросы
homeRouter.delete("/:item/:id", homeController.deleteItem);
module.exports = homeRouter;