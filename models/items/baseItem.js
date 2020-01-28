const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseMaterial = new Schema({
    title: String,
    description: String,
    language: String, // Сделать отдельную модель в будущем
    viewsCount: Number,
    size: Number,
    link: String,
    extensions: String,
    authors: {
        type: String,
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, {timestamps: true});

module.exports.schema = baseMaterial;
module.exports.model = mongoose.model("Base", baseMaterial);
