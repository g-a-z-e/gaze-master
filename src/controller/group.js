const Admin = require('../model').Admin;
const Group = require('../model').Group;
const privateSalt = require('../config').private.salt;
const md5 = require('md5');
const check = require('../common/params').check;
const GROUPTYPE = ['Android', 'IOS', 'Web', 'Wap', 'Server', 'Node', 'Linux', 'ALL'];   //ALL is not a Type
const RESPONSE_FALSE = {
    message: false
};
const RESPONSE_TRUE = {
    message: true
};

class Action {
    static getAction() {

        let getMethod = this.params.groupKey;
        let admin = this.gazeScope.admin;
        let groupType = this.query.groupType;

        var filterCb = admin.groups.filter(group=> {
            if (groupType == group.groupType || groupType == 'ALL') {
                return true;
            }
        });
        
        if (getMethod == 'all') {
            this.body = Object.assign({}, RESPONSE_TRUE, {data: {groups: filterCb}});
        }
    }

    static postAction() {
        let admin = this.gazeScope.admin;
        let groupName = this.params.groupKey;
        let groupType = this.query.groupType;

        var filterCb = admin.groups.filter(group=> {
            if (groupName == group.groupName && groupType == group.groupType) {
                return true;
            }
        });

        if (filterCb.length != 0) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            return;
        }

        let group = new Group();
        let groupKey = md5(groupName + Date.now() + privateSalt);
        group.groupName = groupName;
        group.groupType = groupType;
        group.groupKey = groupKey;

        const cb = new Promise((resolve) => {
            admin.groups.push(group);
            admin.save(err => {
                if (err) {
                    resolve({
                        err,
                        msg: true
                    })
                } else {
                    resolve({
                        err,
                        msg: false
                    })
                }
            });
        });

        if (cb.msg) {
            console.log(cb.err);
            this.body = RESPONSE_FALSE;
            this.status = 500;
        } else {
            this.body = Object.assign({}, RESPONSE_TRUE, {data: {groupKey}});
        }
    }

    static putAction() {

    }

    static deleteAction() {

    }
}

exports.action = function *(actionType) {

    if (Action[actionType + 'Action'] != null) {
        if (check.call(this, ['groupKey'], ['groupType'])) {
            return;
        }
        //TODO: post 时 groupName 的过滤
        if ((!(/^[0-9a-zA-Z]+$/).exec(this.params.groupKey) && actionType != 'post') || GROUPTYPE.indexOf(this.query.groupType) === -1) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            return;
        }
        Action[actionType + 'Action'].call(this);
    } else {
        this.body = RESPONSE_FALSE;
        this.status = 500;
    }
};

