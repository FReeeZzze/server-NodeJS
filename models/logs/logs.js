const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const logs = new Schema(
    {
        action: {
            type: String,
            default: '...',
        },
        userId: {
            type: String,
            default: 'Noname',
        },
    },
    { timestamps: true },
);

// eslint-disable-next-line no-unused-vars
const Logs = (module.exports = mongoose.model('Logs', logs));
