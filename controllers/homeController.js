exports.index = (req, res) => {
    response.send("Главная страница");
};

exports.upload = (req, res, next) => {
    if (req.file === null) return res.status(400).json({ msg: 'Файл не загружен' });
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
};