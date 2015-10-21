const Admin = require('../model').Admin;
const Group = require('../model').Group;
const privateSalt = require('../config').private.salt;
const md5 = require('md5');
const GROUPTYPE = ['Android', 'IOS', 'Web', 'Wap', 'Server', 'Node', 'Linux'];
const RESPONSE_FALSE = {
    message: false
};
const RESPONSE_TRUE = {
    message: true
};

class Action {
    static getAction() {
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

        const cb = new Promise((resolve) => {
            let group = new Group();
            group.groupName = groupName;
            group.groupType = groupType;
            group.groupKey = md5(groupName + Date.now() + privateSalt);

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
            this.body = RESPONSE_TRUE;
        }
    }

    static putAction() {

    }

    static deleteAction() {

    }
}

exports.action = function *(actionType) {
    if (check.call(this, ['groupKey'], ['groupType'])) {
        return;
    }
    if (GROUPTYPE.indexOf(this.query.groupType) === -1) {
        this.body = RESPONSE_FALSE;
        this.status = 500;
        return;
    }

    if (Action[actionType + 'Action'] != null) {
        Action[actionType + 'Action'].call(this);
    } else {
        this.body = RESPONSE_FALSE;
        this.status = 500;
    }
};

function check(params, query) {
    let flag = false;
    params.forEach(param => {
        if (this.params[param] == null) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            flag = true;
        }
    });

    query.forEach(param => {
        if (this.query[param] == null) {
            this.body = RESPONSE_FALSE;
            this.status = 500;
            flag = true;
        }
    });
    return flag;
}