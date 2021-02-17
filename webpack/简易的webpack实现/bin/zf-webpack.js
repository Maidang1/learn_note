#! /usr/bin/env node

/** 拿到配置 */

let path = require('path');
let config = require(path.resolve('config.js'));
let Compiler = require('../lib/Compiler');
let compiler = new Compiler(config);
/** 运行代码 */
compiler.run();
