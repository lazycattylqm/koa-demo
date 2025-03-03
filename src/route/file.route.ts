import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { FileRequest } from '../type';


const router = express.Router()

const basePath: string = path.join(path.resolve(process.cwd()), 'data')

router.put('/file', (req, res) => {
  const { items } = req.body as FileRequest
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath)
  }
  fs.writeFileSync(path.join(basePath, 'file.json'), JSON.stringify(items))


  res.send({
    message: 'File created successfully'
  });
})


export default router