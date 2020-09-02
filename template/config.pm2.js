const packageJson = require('./package.json')
const name = packageJson.name
const script = packageJson.main

// pm2 测试环境名称
const TEST_NAME = `${name}/test`
// pm2 正式环境名称
const PROD_NAME = `${name}/production`

// 测试数据库配置
const TEST_DB = {
  host: '',
  port: 3306,
  db: '',
  account: '',
  password: ''
}

// 生产数据库配置
const PROD_DB = {
  host: '',
  port: 3306,
  db: '',
  account: '',
  password: ''
}

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
