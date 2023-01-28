'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const process = require("child_process");

const { createFolder } = require('../util.js');
const { deleteFile, deleteDir } = require('../lib/index.js');
const error = chalk.bold.red;

const template = path.join(__dirname, "../bin/template")
const bin = path.join(__dirname, "../bin/cleanFile.js")

const clear = (_path) => fs.rmSync(_path, { recursive: true, force: true })

const list = [
  { dir: true, path: "a", children: [{ dir: true, path: "a/b" }] },
  { dir: true, path: "b", children: [{ file: "a.txt", path: "b" }] },
  { dir: true, path: "c", children: [] }
]
const init = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.dir) {
      const _path = path.join(template, item.path)
      await createFolder(_path)
    }
    if (item.file) {
      const _path = path.join(template, item.path)
      fs.writeFileSync(`${_path}/${item.file}`, "")
    }
    if (item.children && item.children.length > 0) {
      await init(item.children)
    }

  }
}

beforeAll(async () => {
  try {
    await init(list)
  } catch (err) {
    console.log(error("创建测试目录失败：" + err));
  }
});


describe('单元测试', () => {
  test("删除单个目录", () => {
    const url = template + "/c"
    process.execSync(`node ${bin} ${url}`)
    const res = fs.existsSync(url)
    expect(res).toBeFalsy();
  })

  test("删除单个文件", () => {
    const url = template + "/b/a.txt"
    process.execSync(`node ${bin} -f ${url}`)
    const res = fs.existsSync(url)
    expect(res).toBeFalsy();
  })


});

afterAll(() => {
  clear(template);
});


// 输入层级大于文件层级
// 输入层级小于文件层级
// 删除单个文件夹 cleanFile -
// 删除多个文件夹