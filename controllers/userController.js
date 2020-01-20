const User = require("./../Schemes/userScheme.js");

exports.addUser = function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});

    user.save(function (err) {
        if (err) return console.log(err);
        res.send(user);
    });
};

exports.getUsers = function(req, res) {

    User.find({}, function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });
};