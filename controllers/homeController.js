exports.index = (req, res) => {
    res.send("Главная страница");
};

exports.download = (req, res) => {
    const link = "VKRNikolayCherney2.docx";
    const file = __dirname + `/../uploads/${link}`;
    console.log(file);
    res.download(file);
};

exports.upload = (req, res, next) => {
    if (req.file === null) return res.status(400).json({ msg: 'Файл не загружен' });
    let filedata = req.file;
    console.log(filedata);
    let path = __dirname + '/../' + filedata.path;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен и находиться по адресу: " + path);
};