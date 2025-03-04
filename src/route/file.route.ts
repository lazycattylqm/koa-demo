import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import { FileRequest } from '../type';


const router = express.Router()

const basePath: string = path.join(path.resolve(process.cwd()), 'data')

const storage = multer.diskStorage({
  destination: (req: express.Request, file: Express.Multer.File, cb: (error: (Error | null), destination: string) => void) => {
    cb(null, 'public/upload/'); // 文件保存目录
  },
  filename: (req: express.Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop(); // 获取文件扩展名
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`); // 生成唯一文件名
  }
});

const upload = multer({ storage });

const uploadPath = path.join(path.resolve(process.cwd()), 'public', 'upload')
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

router.put('/file', (req, res) => {
  const { fileName, items } = req.body as FileRequest
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath)
  }
  fs.writeFileSync(path.join(basePath, fileName), JSON.stringify(items), { flag: 'w' })


  res.send({
    message: 'File created successfully'
  });
})

router.post('/upload', upload.single('file'), (req, res) => {

  res.send({
    message: 'File uploaded successfully'
  });
})

router.get('/download/:fileName', (req, res) => {
  const { fileName } = req.params
  if (!fs.existsSync(path.join(uploadPath, fileName as string))) {
    res.status(404).send({
      message: 'File not found'
    })
  } else {
    res.download(path.join(uploadPath, fileName as string))
  }
})

router.get('/preview/:fileName', (req, res) => {
  const { fileName } = req.params
  if (!fs.existsSync(path.join(uploadPath, fileName as string))) {
    res.status(404).send({
      message: 'File not found'
    })
  }
  res.type(path.extname(fileName as string))
  res.sendFile(path.join(uploadPath, fileName as string))
})


export default router