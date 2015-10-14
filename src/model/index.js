const mongoose = require('mongoose');
const config = require('../config');
const User = require('./user');
const Admin = require('./admin');
const Group = require('./group').Group;

mongoose.connect(config.db.url, err=> {
    if (err) {
        console.log(err);
    }
});

exports.User = mongoose.model('User');
exports.Admin = mongoose.model('Admin');
exports.Group = mongoose.model('Group');