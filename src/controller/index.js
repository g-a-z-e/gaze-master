exports.fn = function *() {
    yield this.render('index', {
        title: 'Gaze',
        css:'css/index.css'
    });
};