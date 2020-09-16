const Koa = require('koaman')
const app = new Koa()

app
  .cors()
  .logger()
  .util()
  .errorHandler()
  // .model()
  .service()
  .controller()
  .router()

app.start()
