'use strict';

const clearFile = require('..');
const assert = require('assert').strict;

assert.strictEqual(clearFile(), 'Hello from clearFile');
console.info("clearFile tests passed");
