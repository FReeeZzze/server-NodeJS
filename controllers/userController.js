const User = require("../Schemes/userSchema.js");

exports.addUser = (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userPassword = req.body.password;
    const user = new User({
        name: {
            firstName: userFirstName,
            lastName: userLastName
        },
        password: userPassword
    });

    User.addUser(user, (err, user) => {
        if(err) return console.log(err);
        res.json(user);
    });
};

exports.getUsers = (req, res) => {

    User.getUsers((err, users) => {
        if(err) return console.log(err);
        res.json(users);
    });
};

exports.findUser = (req, res) => {

    const id = req.params.id;
    User.getUserById(id, (err, user) => {
        if(err) return console.log(err);
        res.json(user);
    });
};

exports.deleteUser = (req, res) =>{

    const id = req.params.id;
    User.deleteUser(id, (err, user) => {

        if(err) return console.log(err);
        res.send(user);
    });
};

exports.editUser = (req, res) => {

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userPassword = req.body.password;
    const newUser = {
        firstName: userFirstName,
        lastName: userLastName,
        password: userPassword
    };

    User.updateUser(id, newUser, {new: true, useFindAndModify: false}, (err, user) => {
        if(err) return console.log(err);
        res.send(user);
    });
};