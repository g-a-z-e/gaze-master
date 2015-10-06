exports.fn = function *() {
    yield this.render('main', {
        title: 'Gaze',
        css:'css/index.css'
    });
};