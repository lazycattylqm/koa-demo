import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { combineRouter } from './route/combinRouter';
import * as bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.json());

combineRouter(app);

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});