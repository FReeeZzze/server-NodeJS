const fs = require('fs-extra');
const removeFiles = (params) => {
    const dir = __dirname + `/../../uploads/items/${params.split("\\").pop()}`;
    fs.remove(dir, function(err){
        if(err) return console.log(err);
        console.log('files and directory deleted successfully');
    });
};

module.exports = {
    removeFiles
};