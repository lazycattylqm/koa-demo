import * as fs from 'fs';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as path from 'path';
import { FileRequest, FileResponse } from '../type';

const router: Router = new Router({ prefix: '/api' });


const uploadPath: string = path.join(path.resolve(process.cwd()), 'public/upload');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

router.put('/file', async (ctx: any) => {
  const body: FileRequest = ctx.request.body as FileRequest
  const fileName: string = body.fileName


  fs.writeFileSync(path.join(uploadPath, fileName), JSON.stringify(body.items), { flag: 'w' });
  const response: FileResponse = {
    message: 'File created!'
  }
  ctx.body = response;
});

router.post('/upload', async (ctx: any) => {
  const { filepath } = ctx.request.files.file;
  const response: FileResponse = {
    message: `${path.basename(filepath)} File uploaded!`
  }
  ctx.body = response;
});

router.get('/download/:file', async (ctx: any) => {
  const file = ctx.params.file;
  const filePath = path.join(uploadPath, file);
  ctx.attachment(filePath);
  ctx.body = fs.createReadStream(filePath);
});

router.get('/preview/:file', async (ctx: any) => {
  const file = ctx.params.file;
  await send(ctx, file, { root: uploadPath });
});

export default router;