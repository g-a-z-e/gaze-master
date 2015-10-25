const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    information: String,
    infoType: String,
    exportType: String,
    date: {type: Date, default: Date.now}
});

module.exports = InfoSchema;