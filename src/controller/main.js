exports.fn = function *() {
    yield this.render('main', {
        title: 'Gaze',
        css:'css/main.css'
    });
};