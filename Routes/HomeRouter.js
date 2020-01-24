const express = require("express");
const homeController = require("./../controllers/homeController.js");
const Config = require("../Config/config");

const type = Config.upload.single("filedata");
const homeRouter = express.Router(); // для адресов с "/"

//get запросы
homeRouter.get("/",homeController.index);

//post запросы
homeRouter.post("/upload", type, homeController.upload);

module.exports = homeRouter;