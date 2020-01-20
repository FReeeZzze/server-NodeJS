const express = require("express");
const userController = require("./../controllers/userController.js");
const User = require("./../Schemes/userScheme.js");
const jsonParser = express.json();

const userRouter = express.Router();  // для адресов с "/users"

userRouter.get("/",userController.getUsers);

userRouter.get("/:id", function(req, res){

    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

userRouter.post("/", jsonParser,userController.addUser);

userRouter.delete("/:id", function(req, res){

    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

userRouter.put("/", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
});

module.exports = userRouter;