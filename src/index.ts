import { bodyParser } from '@koa/bodyparser';
import * as Cors from '@koa/cors';
import * as Koa from 'koa';
import router from './route';

const app = new Koa();

app.use(Cors());
app.use(bodyParser());
app.use(router.router());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});