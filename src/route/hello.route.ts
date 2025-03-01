import * as Router from 'koa-router';

const router = new Router();

router.get('/hello', async (ctx: any) => {
  ctx.body = 'Hello World!';
});

export default router;