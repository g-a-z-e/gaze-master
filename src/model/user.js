const mongoose = require('mongoose');
const InfoSchema = require('./info');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    cookieKey: String,
    specialKey: String,
    groupKey: String,
    information: [InfoSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;