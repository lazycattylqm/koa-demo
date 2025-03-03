import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { combineRouter } from './route/combinRouter';

dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(express.static('public'))

combineRouter(app);

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});