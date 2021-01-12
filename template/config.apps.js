const apps = require('koaman/apps')

// 路径：临时文件夹
const { PATH_TMP } = require('./config.path')
// DB 配置
const { TEST_DB, PROD_DB } = require('./config.db')
// UDP 服务
const UDP_SERVE = require('./config.udp_serve')
// Redis 配置
const { TEST_REDIS, PROD_REDIS } = require('./config.redis')
// Http 端口号
const PORT = 10001
// UDP 服务端口号
const UDP_PORT = 10009

// PM2 配置
module.exports = apps([
  {
    env: {
      NODE_ENV: 'test',
      UDP_PORT,
      UDP_SERVE,
      REDIS: TEST_REDIS,
      PATH_TMP,
      DB: TEST_DB,
      PORT
    }
  },
  {
    // exec_mode: 'cluster',
    // instances: 3,
    // instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production',
      UDP_PORT,
      UDP_SERVE,
      REDIS: PROD_REDIS,
      PATH_TMP,
      DB: PROD_DB,
      PORT
    }
  }
])
