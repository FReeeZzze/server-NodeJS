const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/users/user');

class Auth {
    signUp(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({
                success: false,
                msg: 'Please pass username and password.',
            });
        } else {
            var newUser = new User({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            // save the user
            newUser.save((err) => {
                if (err) {
                    return res.json({
                        success: false,
                        msg: 'Username already exists.',
                    });
                }
                res.json({
                    success: true,
                    msg: 'Successful created new user.',
                });
            });
        }
    }
    signIn(req, res) {
        User.findOne(
            {
                username: req.body.username,
            },
            (err, user) => {
                if (err) throw err;

                if (!user) {
                    // res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
                    res.json({
                        success: false,
                        msg: 'Authentication failed. User not found.',
                    });
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.sign(user.toJSON(), config.secret, {
                                expiresIn: '30m',
                            });
                            // return the information including token as JSON
                            res.json({
                                success: true,
                                token: 'JWT ' + token,
                                msg: 'Authentication success',
                            });
                        } else {
                            // res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                            res.json({
                                success: false,
                                msg: 'Authentication failed. Wrong password.',
                            });
                        }
                    });
                }
            },
        );
    }
}

module.exports = new Auth();
