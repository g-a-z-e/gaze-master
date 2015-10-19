const md5 = require('md5');
const Admin = require('../model').Admin;

const check = function (username, password) {
    try {
        this.assertCSRF(this.request.body.csrfToken);
    } catch (err) {
        this.status = 403;
        this.body = {
            message: false
        };
        return false;
    }

    if (username.length < 6 ||
        password.length < 6 || !(/^[0-9a-z]+$/).exec(password) || !(/^[0-9a-z]+$/).exec(username)) {
        let response = {
            message: false
        };
        this.body = response;
        this.status = 500;
        return false;
    }
    return true;
};

exports.fn = function *() {
    yield this.render('login', {
        title: 'Gaze Login',
        css: 'css/index.css',
        csrf: this.csrf
    });
};

exports.login = function *() {

    let username = this.request.body.username;
    let password = this.request.body.password;
    const checkResult = check.call(this, username, password);
    if (!checkResult) {
        return;
    }

    const cb = yield new Promise((resolve) => {
        Admin.findOne({userName: username}, (err, data)=> {
            if (err || data == null) {
                resolve({
                    err,
                    msg: true
                })
            } else {
                resolve({
                    err,
                    msg: false,
                    data
                });
            }
        });
    });

    if (!cb.msg) {
        if (cb.data.password == md5(md5(password) + cb.data.salt)) {
            let response = {
                message: true
            };
            let GAZEID = md5(md5(username) + Date.now());
            cb.data.userToken = GAZEID;
            const cb2 = yield new Promise((resolve) => {
                cb.data.save((err) => {
                    if (err) {
                        resolve({
                            err,
                            msg: true
                        })
                    } else {
                        resolve({
                            err,
                            msg: false
                        });
                    }
                });
            });
            if (cb2.msg) {
                let response = {
                    message: false
                };
                this.body = response;
                this.status = 500;
                return;
            }
            this.body = response;
            this.cookies.set('GAZEID', GAZEID, {expires: new Date(Date.now() + 3600000)});
        } else {
            let response = {
                message: false
            };
            this.body = response;
            this.status = 403;
        }
    } else {
        console.log(cb.err);
        let response = {
            message: false
        };
        this.body = response;
        this.status = 500;
    }

};

exports.signUp = function *() {

    let username = this.request.body.username;
    let password = this.request.body.password;
    const checkResult = check.call(this, username, password);
    if (!checkResult) {
        return;
    }

    let salt = md5(Math.random() + Date.now());
    let GAZEID = md5(md5(username) + Date.now());
    let admin = new Admin();
    admin.userName = username;
    admin.password = md5(md5(password) + salt);
    admin.userToken = GAZEID;
    admin.salt = salt;
    const cb = yield new Promise((resolve) => {
        admin.save((err) => {
            if (err) {
                resolve({
                    err,
                    msg: true
                })
            } else {
                resolve({
                    err,
                    msg: false
                });
            }
        });
    });


    if (!cb.msg) {
        let response = {
            message: true
        };
        this.body = response;
        this.cookies.set('GAZEID', GAZEID, {expires: new Date(Date.now() + 3600000)});
    } else {
        console.log(cb.err);
        let response = {
            message: false
        };
        this.body = response;
        this.status = 500;
    }
};

exports.check = function *(next) {
    const GAZEID = this.cookies.get('GAZEID');
    if (GAZEID == null || GAZEID.length != 32 || !(/^[0-9a-zA-Z]+$/).exec(GAZEID)) {
        let response = {
            message: false
        };
        this.body = response;
        this.redirect('/login');
        return;
    }

    const cb = yield new Promise((resolve) => {
        Admin.findOne({userToken: GAZEID}, (err, data)=> {
            if (err || data == null) {
                resolve({
                    err,
                    msg: true
                })
            } else {
                resolve({
                    err,
                    msg: false,
                    data
                });
            }
        });
    });

    if (cb.msg) {
        let response = {
            message: false
        };
        this.body = response;
        this.redirect('/login');
    } else {
        yield next;
    }
};