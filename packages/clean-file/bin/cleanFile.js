#!/usr/bin/env node

const program = require('commander')
const version = require('../package.json').version
const { deleteDir, deleteFile } = require('../lib/index')

program
  .version(version, '-v, --version')

program
  .argument('<dirname...>')
  .option("-f, --file", "删除文件")
  .option('-r, --recursion <count>', '递归次数')
  .action((dirname, options, command) => {
    if (options.recursion) {
    } else if (options.file) {
      console.error("删除file", options.file);
      for (let i = 0; i < dirname.length; i++) {
        const item = dirname[i];
        deleteFile(item)
      }
    } else {
      for (let i = 0; i < dirname.length; i++) {
        const item = dirname[i];
        deleteDir(item)
      }
    }
  })


// program
//   .option("-f, --file <fileName...>", "删除的文件名")
//   .description('Example program with argument descriptions')
//   .action(require("../lib/index").test)
//   .parse();
program.parse(process.argv)