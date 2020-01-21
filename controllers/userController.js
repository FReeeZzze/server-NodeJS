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

    user.save( (err) => {
        if (err) return console.log(err);
        res.send(user);
    });
    res.redirect("/users");
};

exports.getUsers = (req, res) => {

    User.find({}, (err, users) => {

        if (err) return console.log(err);
        res.send(users)
    });
};

exports.findUser = (req, res) => {

    const id = req.params.id;
    User.findOne({_id: id}, (err, user) => {

        if(err) return console.log(err);
        res.send(user);
    });
};

exports.deleteUser = (req, res) =>{

    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {

        if(err) return console.log(err);
        res.send(user);
    });
    res.redirect("/users");
};

exports.editUser = (req, res) => {

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userPassword = req.body.password;
    const newUser = {
        name: {
            firstName: userFirstName,
            lastName: userLastName
        },
        password: userPassword
    };

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, (err, user) => {
        if(err) return console.log(err);
        res.send(user);
    });
};