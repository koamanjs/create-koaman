const packageJson = require('./package.json')
const name = packageJson.name
const script = packageJson.main

// pm2 测试环境名称
const TEST_NAME = `${name}/test`
// pm2 正式环境名称
const PROD_NAME = `${name}/production`

// DB 配置
const { TEST_DB, PROD_DB } = require('./config.db')

// 端口号
const PORT = 10001

// PM2 配置
module.exports = {
  apps: [
    {
      name: TEST_NAME,
      script,
      env: {
        NODE_ENV: 'test',
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
        DB: JSON.stringify(PROD_DB),
        PORT
      }
    }
  ]
}
