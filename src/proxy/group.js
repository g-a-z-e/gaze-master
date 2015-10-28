/**
 * @module groupProxy
 * @author Rube
 * @date 15/10/28
 * @desc group数据库操作
 */
const Admin = require('../model').Admin;
exports.findGroupDataByGroupKey = function *(groupKey) {
    const cb = yield new Promise((resolve) => {
        Admin.find(
            {'groups.groupKey': groupKey},
            {'groups': {$elemMatch: {groupKey: groupKey}}},
            function (err, group) {
                if (err) {
                    resolve({
                        err,
                        msg: true
                    });
                } else {
                    resolve({
                        err,
                        data: group[0].groups[0],
                        msg: false
                    });
                }
            });
    });
    if (cb.msg) {
        console.log(cb.err);
        return false;
    } else {
        return cb.data;
    }
};