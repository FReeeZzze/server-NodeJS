const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseMaterialSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    language: String, // Сделать отдельную модель в будущем
    viewsCount: Number,
    size: Number,
    filename: String,
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
    dates: {
        created: {
            type: Date,
            default: Date.now,
        },
        update: {
            type: Date,
            default: Date.now
        }
    },
});

module.exports = mongoose.model("Material", baseMaterialSchema);