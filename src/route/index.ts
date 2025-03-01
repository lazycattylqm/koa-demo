import * as combineRouters from 'koa-combine-routers'

import fileRouter from './file.route'
import helloRouter from './hello.route'

const router = combineRouters([helloRouter, fileRouter])

const middleware = [helloRouter.allowedMethods(), fileRouter.allowedMethods()]


export default {
  router,

  middleware
}