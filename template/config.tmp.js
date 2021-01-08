const path = require('path')
const fs = require('fs')
const tmpDirPath = path.resolve(__dirname, 'tmp')

!fs.existsSync(tmpDirPath) && fs.mkdirSync(tmpDirPath)

module.exports = tmpDirPath
