const fs = require('fs-extra');
exports.removeFiles = (params) => {
    const dir = __dirname + `/../../uploads/items/${params.split("\\").pop()}`;
    fs.remove(dir, function(err){
        if(err) return console.log(err);
        console.log('files and directory deleted successfully');
    });
};

exports.downloadFiles = (params, res) => {
    fs.stat(params, function(err, stat) {
        if(err == null) {
            // file exist
            res.download(params);
        } else if(err.code === 'ENOENT') {
            // file does not exist
            fs.writeFile('download-logs.txt', err, function(err, result) {
                if(err) console.log('error', err);
                res.send("FILE DOES NOT EXIST!");
            });
        } else {
            console.log('Some other error: ', err.code);
            res.send("Undefined error");
        }
    });
};
// module.exports = removeFiles;