const path = require('path')
const fs = require('fs')
const tmpPath = path.resolve(__dirname, 'tmp')

!fs.existsSync(tmpPath) && fs.mkdirSync(tmpPath)

module.exports = tmpPath
