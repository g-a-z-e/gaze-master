const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    information: String,
    infoType: String,
    date: { type: Date, default: Date.now }
});

module.exports = InfoSchema;