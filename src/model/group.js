const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: String,
    groupKey: String,
    groupType: String,
    groupServerAddress: String,
    createTime: {type: Date, default: Date.now}
});

const Group = mongoose.model('Group', GroupSchema);

exports.Group = Group;
exports.GroupSchema = GroupSchema;