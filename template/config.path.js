const path = require('path')
const fs = require('fs')
const PATH_TMP = path.resolve(__dirname, 'tmp')

!fs.existsSync(PATH_TMP) && fs.mkdirSync(PATH_TMP)

module.exports = { PATH_TMP }
