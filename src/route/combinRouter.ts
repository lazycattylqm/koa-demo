
import * as express from 'express';
import fileRouter from './file.route';
import helloRouter from './hello.route';

export const combineRouter = (app: express.Application) => {
  app.use('/api', fileRouter);
  app.use('/api', helloRouter);
}