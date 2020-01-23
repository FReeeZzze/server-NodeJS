const express = require("express");
const userController = require("./../controllers/userController.js");
const userRouter = express.Router();  // для адресов с "/users"

//get запросы
userRouter.get("/",userController.getUsers);

userRouter.get("/:id", userController.findUser);

//post запросы
userRouter.post("/", userController.addUser);

//delete запросы
userRouter.delete("/:id", userController.deleteUser);

//put запросы
userRouter.put("/", userController.editUser);

module.exports = userRouter;