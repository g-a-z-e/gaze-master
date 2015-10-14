const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = require('./group').GroupSchema;

const AdminSchema = new Schema({
        userName: {type: String, unique: true},
        password: String,
        userToken: String,
        salt: String,
        createTime: {type: Date, default: Date.now},
        groups: [GroupSchema]
    },
    {collection: 'admin'}
);

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;