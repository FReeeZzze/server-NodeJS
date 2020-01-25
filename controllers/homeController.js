exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.download = (req, res) => {
    const path = req.link;
    const file = __dirname + `/../${path}`;
    console.log(file);
    res.download(file);
};

exports.addItem = (req, res, next) => {
    if (!(req.body && req.file)) return res.sendStatus(400);
    const filedata = req.file;
    console.log("Файл", filedata);
    const ext = filedata.originalname.split('.').pop();
    console.log("Формат: ",ext);
    let title = '';
    let link = req.file.path;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
};
