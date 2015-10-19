const koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const csrf = require('koa-csrf');
const session = require('koa-session');
const path = require('path');

const config = require('./config');
const app = koa();

const indexController = require('./controller/index');
const signController = require('./controller/sign');
const mainController = require('./controller/main');

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};


render(app, {
    root: path.join(__dirname, '../view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

router.get('/', function *(next) {
    yield indexController.fn.call(this);
});

router.get('/login', function *(next) {
    yield signController.fn.call(this);
});

router.get('/main', function *(next) {
    yield signController.check.call(this, next);
}, function *(next) {
    yield mainController.fn.call(this);
});

router.post('/login', function *(next) {
    yield signController.login.call(this);
});

router.post('/signUp', function *(next) {
    yield signController.signUp.call(this);
});

router.get('/g/:groupKey', function *(next) {
});

router.post('/g/:groupKey/:action', function *(next) {

});

app.keys = ['session secret'];
app.use(session(app));
csrf(app);
app.use(bodyParser());
app.use(serve(__dirname + '/../public'));
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.server.port);