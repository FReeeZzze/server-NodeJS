const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const baseMaterial = require('./baseItem');

const bookSchema = extendSchema(baseMaterial,{
    publishing_house: String,
    identification: {
        ISBN: {
            type: String,
        },
        UDK: {
            type: String,
        },
        BBK: {
            type: String,
        }
    },
    about: {
        content: {
            type: String,
        },
        references: {
            type: String,
        },
        annotation: {
            type: String,
        }
    },
});

module.exports = mongoose.model("Book", bookSchema);