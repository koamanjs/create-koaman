const Koa = require('koaman')
const app = new Koa()

app
  .logger()
  .errorHandler()
  .cors()
  // .model()
  .controller()
  .router()

app.start()
