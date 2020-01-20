const express = require("express");
const userController = require("./../controllers/userController.js");
const jsonParser = express.json();

const userRouter = express.Router();  // для адресов с "/users"

//get запросы
userRouter.get("/",userController.getUsers);

userRouter.get("/:id", userController.findUser);

//post запросы
userRouter.post("/", jsonParser,userController.addUser);

//delete запросы
userRouter.delete("/:id", userController.deleteUser);

//put запросы
userRouter.put("/", jsonParser, userController.editUser);

module.exports = userRouter;