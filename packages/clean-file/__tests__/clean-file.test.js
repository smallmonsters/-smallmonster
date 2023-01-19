'use strict';

const clearFile = require('..');
const assert = require('assert').strict;

assert.strictEqual(clearFile(), 'Hello from clearFile');
console.info("clearFile tests passed");

// 输入层级大于文件层级
// 输入层级小于文件层级
// 删除单个文件
// 删除多个文件夹
