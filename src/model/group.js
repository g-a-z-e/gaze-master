const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: String,
    groupKey: String,
    groupType: String,
    createTime: {type: Date, default: Date.now}
});

module.exports = GroupSchema;