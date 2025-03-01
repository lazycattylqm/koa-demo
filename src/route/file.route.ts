import * as fs from 'fs';
import * as Router from 'koa-router';
import * as path from 'path';
import { FileRequest, FileResponse } from '../type';

const router: Router = new Router();

const basePath: string = path.join(path.resolve(process.cwd()), 'data');

router.put('/file', async (ctx: any) => {
  const body: FileRequest = ctx.request.body as FileRequest
  const fileName: string = body.fileName
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  fs.writeFileSync(path.join(basePath, fileName), JSON.stringify(body.items), { flag: 'w' });
  const response: FileResponse = {
    message: 'File created!'
  }
  ctx.body = response;
});

export default router;