const fs = require('fs')

const createFolder = async (_path) => {
  if (!_path) {
    throw new Error("创建路径不能为空")
  }
  return await fs.mkdirSync(_path, { recursive: true })
}

module.exports = {
  createFolder
}