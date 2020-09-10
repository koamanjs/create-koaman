const Koa = require('koaman')
const app = new Koa()

app
  .cors()
  .logger()
  .util()
  .errorHandler()
  // .model()
  .controller()
  .router()

app.start()
