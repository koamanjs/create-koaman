// Redis 测试环境配置
exports.TEST_REDIS = {
  config: [
    { host: '', port: 20000 }
  ],
  name: 'redis_test'
}

// Redis 正式环境配置
exports.PROD_REDIS = {
  config: [
    { host: '', port: 20000 }
  ],
  name: 'redis'
}
