const mongoose = require('mongoose');
const User = require('../models/users/user.js');

exports.addUser = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(204).send('No Content');

    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        username: username,
        name: name,
        email: email,
        password: password,
    });

    User.addUser(user, (err, user) => {
        if (err) return console.log(err);
        res.json(user);
    });
};

exports.getUsers = (req, res) => {
    User.getUsers((err, users) => {
        if (err) return console.log(err);
        res.json(users);
    });
};

exports.findUser = (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id) === false) return res.send('Not valid ID');
    if (!id) return res.status(400).send('Not Found user');
    User.getUserById(id, (err, user) => {
        if (err) return console.log(err);
        res.json(user);
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id) === false) return res.send('Not valid ID');
    if (!id) return res.status(400).send('Not Found user');
    User.deleteUser(id, (err, user) => {
        if (err) return console.log(err);
        res.send(user);
    });
};

exports.editUser = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(204).send('No Content');
    const id = req.body._id;
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const updateUser = {
        username: username,
        name: name,
        email: email,
        password: password,
    };

    User.updateUser(id, updateUser, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) return console.log(err);
        res.send(user);
    });
};
