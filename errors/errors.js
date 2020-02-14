const fs = require("fs-extra");
const Errors = require("../models/errors/errors");

const err = (error, res) => {
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
    let newErr = new Errors({
        code: id,
        error: error
    });
    Errors.find({error: error},(err, code) => {
        if(err) return console.log(err);
        if(code === null) {
            Errors.addError(newErr, (err, code) => {
                if(err) return console.log(err);
                res.status(500);
                res.json(code);
            });
        }else {
            res.status(500);
            res.json(code);
        }
    });

    // fs.appendFile('errors/error-logs.txt', newErr, (err, result) => {
    //     if(err) console.log('error', err);
    //     let data = fs.readFileSync('errors/error-logs.txt', "utf8", (err, data) => {
    //         if (err) console.log('error', err);
    //     });
    //     console.log(data);
    //     // res.status(500);
    //     // res.send({"errors": data});
    // });
};

module.exports = err;