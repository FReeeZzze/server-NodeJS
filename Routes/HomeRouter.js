const express = require("express");
const homeController = require("./../controllers/homeController.js");
const jsonParser = express.json();

const homeRouter = express.Router(); // для адресов с "/"

//get запросы
homeRouter.get("/",homeController.index);

module.exports = homeRouter;