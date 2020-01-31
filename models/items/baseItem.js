const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseMaterial = new Schema({
    title: {
        type: String,
        default: 'none'
    },
    description: {
        type:String,
        default: 'none'
    },
    language: {
        type:String,
        default: 'ru'
    }, // Сделать отдельную модель в будущем
    viewsCount: {
        type: Number,
        default: 0
    },
    size: Number,
    link: String,
    extensions: String,
    authors: {
        type: String,
        default: 'Noname'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
        }
    ],
});

module.exports.schema = baseMaterial;
module.exports.model = mongoose.model("Base", baseMaterial);
