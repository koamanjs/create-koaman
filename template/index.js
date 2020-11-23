const Koa = require('koaman')
const app = new Koa()

app
  .cors()
  .logger()
  .util()
  .errorHandler()
  // .udp(JSON.parse(process.env.UDP_SERVE_CONFIG))
  // .udpServer(process.env.UDP_PORT)
  // .redis(JSON.parse(process.env.REDIS_CONFIG))
  // .model()
  .service()
  .controller()
  .router()

app.start()
