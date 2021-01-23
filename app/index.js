const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/api/docs', async ctx => {
    ctx.type = 'json';
    ctx.body = [
        { id: 1, name: 'docs1' },
        { id: 2, name: 'docs2' },
    ];
});

router.post('/api/docs', async ctx => {
    ctx.type = 'json';
    ctx.body = Date.now(); // TODO: create new docs
});

router.get('/api/docs/:id', async ctx => {
    ctx.type = 'json';
    ctx.body = {};
});

router.put('/api/docs/:id', async ctx => {
    ctx.type = 'json';
    ctx.body = {};
});

router.get('/api/content/:id', async ctx => {
    ctx.type = 'json';
    ctx.body = [];
});

router.post('/api/content/:id', async ctx => {
    ctx.type = 'json';
    ctx.body = {};
});

router.get('/api/pull/:id', async ctx => {
    ctx.type = 'text/event-stream';
    ctx.body = '';
});

app.use(router.routes());
app.use(
    router.allowedMethods({
        throw: true, // 抛出错误，代替设置响应头状态
        notImplemented: () => '不支持当前请求所需要的功能',
        methodNotAllowed: () => '不支持的请求方式',
    }),
);

app.listen(3000);

console.log('------------------------------------');
console.log('Server running on http://localhost:3000');
console.log('------------------------------------');