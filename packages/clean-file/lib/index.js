const fs = require("fs");
const chalk = require('chalk');

const error = chalk.bold.red;


/**
 * TODO:
 * - 根据不同命令、选项、参数输出打印不同的结果
 * - 根据不同命令、选项、参数执行不同的方法
 * - 创建文件(done)
 * - 判断文件夹是否处在
 * - 判断文件是否处在
 * - 清理多层目录
 * - 删除的目标与命令不一致，报错
 * - 删除前，二次确认
 * -
 *
 *
 * **/
const deleteDir = (_path) => {
  const res = fs.lstatSync(_path, { throwIfNoEntry: false })
  if (res) {
    if (res.isDirectory()) {
      fs.rmSync(_path, { recursive: true, force: true })
    } else {
      console.log(error(`参数错误：${_path}不是目录`))
    }
  }

}

const deleteFile = (_path) => {
  const res = fs.lstatSync(_path, { throwIfNoEntry: false })
  if (res) {
    if (res.isFile()) {
      fs.unlinkSync(_path)
    } else {
      console.log(error(`参数错误：${_path}不是文件`))
    }
  }
}


module.exports = {
  deleteFile,
  deleteDir,
}