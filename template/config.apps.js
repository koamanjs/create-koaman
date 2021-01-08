const packageJson = require('./package.json')
const name = packageJson.name
const script = packageJson.main

// pm2 测试环境名称
const TEST_NAME = `${name}/test`
// pm2 正式环境名称
const PROD_NAME = `${name}/production`
// 文件夹：临时文件夹
const { tmpPath: PATH_TMP } = require('./config.path')
// DB 配置
const { TEST_DB, PROD_DB } = require('./config.db')
// UDP 服务
const UDP_SERVE_CONFIG = require('./config.udp_serve')
// Redis 配置
const { TEST_REDIS, PROD_REDIS } = require('./config.redis')
// Http 端口号
const PORT = 10001
// UDP 服务端口号
const UDP_PORT = 10009

// PM2 配置
module.exports = {
  apps: [
    {
      name: TEST_NAME,
      script,
      env: {
        NODE_ENV: 'test',
        UDP_PORT,
        UDP_SERVE_CONFIG: JSON.stringify(UDP_SERVE_CONFIG),
        REDIS_CONFIG: JSON.stringify(TEST_REDIS),
        PATH_TMP,
        DB: JSON.stringify(TEST_DB),
        PORT
      }
    },
    {
      name: PROD_NAME,
      script,
      // exec_mode: 'cluster',
      // instances: 3,
      // instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'production',
        UDP_PORT,
        UDP_SERVE_CONFIG: JSON.stringify(UDP_SERVE_CONFIG),
        REDIS_CONFIG: JSON.stringify(PROD_REDIS),
        PATH_TMP,
        DB: JSON.stringify(PROD_DB),
        PORT
      }
    }
  ]
}
