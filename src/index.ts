import * as Cors from '@koa/cors';
import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import KoaBody, { HttpMethodEnum } from 'koa-body';
import * as KoaStatic from 'koa-static';
import { nanoid } from 'nanoid';
import * as path from 'path';
import router from './route';

dotenv.config()

const app = new Koa();

app.use(Cors());
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 200MB'
    keepExtensions: true,
    uploadDir: path.join(path.resolve(process.cwd()), 'public/upload'),
    onFileBegin: (name, file) => { // 文件开始处理钩子
      // 生成自定义文件名逻辑
      const ext = path.extname(file.originalFilename);
      const filename = `${Date.now()}-${nanoid(6)}${ext}`;
      // 修改最终存储路径
      file.filepath = path.join(path.resolve(process.cwd()), 'public/upload', filename);

      // 安全过滤（防止路径穿越）
      file.originalFilename = file.originalFilename.replace(/[^a-zA-Z0-9_\-.]/g, '');
    }
  },
  parsedMethods: [HttpMethodEnum.POST, HttpMethodEnum.PUT, HttpMethodEnum.PATCH, HttpMethodEnum.DELETE, HttpMethodEnum.GET, HttpMethodEnum.HEAD],


}));

app.use(KoaStatic(path.join(path.resolve(process.cwd()), 'public')));

app.use(router.router());

app.listen(process.env.port, () => {
  console.log(`Listening to port ${process.env.port}`);
});