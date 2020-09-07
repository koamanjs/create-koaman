const Koa = require('koaman')
const app = new Koa()

app
  .cors()
  .logger()
  .errorHandler()
  // .model()
  .controller()
  .router()

app.start()
