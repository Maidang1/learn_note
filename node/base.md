## base

浏览器 window

浏览器无法访问global 用window代理

node可以直接访问global

默认声明不放在global上面

node的特点 每个文件就是一个模块 外面包了匿名函数

参数有 module exporgs require \-\-dirname \-\-filename

this === module.exports



globale中的属性叫做全局属性

process

buffer 缓冲区 16进制

chdir cwd current working directory env nextTicknode



```javascript
process.argv //用户传递进来的参数
process.platform // win32
// commander
process.env
```



node事件环

```javascript
  ┌───────────────────────────┐
┌─>│           timers          │ ---> setTimeout() 和 setInterval()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ ---> 执行TCP错误之类的系统回到
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ ---> 内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │ 获取新的 I/O事件 查找已经导师的定时器
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │  ---> setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ ---> 关闭事件的回调 socket.close事件
   └───────────────────────────┘
```



微任务 nextTick() promise.then()



## module

```javascript
node中js文件就是一个模块 

防止命名冲突 功能疯转

commonjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');
function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._cache = {};
Module.resolveFileName = function (filename) {
  let asbPath = path.resolve(__dirname, filename);
  let flag = fs.existsSync(asbPath);
  let current;
  if (!flag) {
    let keys = Object.keys(Module.extendions);
    for (let i = 0; i < keys.length; i++) {
      current = asbPath + keys[i];
      flag = fs.existsSync(current);
      if (flag) break;
      else current = '';
    }
  }
  if (!current) throw new Error('文件不存在');
  return current;
};

Module.wrapper = [
  '(function(module, exports, require, __filename, ___dirname){',
  '})',
];

Module.extendions = {
  '.js'(module) {
    let script = fs.readFileSync(module.id, 'utf8');
    let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
    let fn = vm.runInContext(fnStr);
    fn.call(
      module.exports,
      module,
      module.exports,
      req,
      module.id,
      path.dirname(module.id)
    );
  },
  '.json'(module) {
    let code = fs.readFileSync(module.id, 'utf8');
    module.exports = JSON.parse(code);
  },
};

Module.prototype.load = function () {
  let ext = path.extname(this.id);
  module.exports[ext](this);
};
function req(filename) {
  // 相对路径变成绝对路径
  let current = Module.resolveFileName(filename);
  if (Module._cache[current]) {
    return Module._cache[current].exports;
  }
  let module = new Module(current);
  Module._cache[current] = module;
  module.load();
  return module.exports;
}

req('./a.js');

// 
```



## npm

### 初始化包

```bash
npm init -y
```

### 下载包

```bash
npm i http-server -g # 全局包
npm i express # 本地包
```

### 写个全局包

```
// bin/xxx
#! /usr/bin/env node

package.json :
"bin": {
	'lesson-zf':'./bin/www'
}

// npm link 自动链接过去
npm i --production
npm pack
```



## core-module

```javascript
const promisefy = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err) {
        if (err) reject(err);
        resolve();
      });
    });
  };
};
// node error-first
```



## base64

```javascript
console.log(Buffer.from('珠'));
// e7 8f a0
console.log((0xe7).toString(2));
console.log((0x8f).toString(2));
console.log((0xa0).toString(2));

// 11100111 10001111 10100000 3 * 8 ==> 6 * 4

// 111001 111000 111110 1000000

let str = 'ABCDEFGHIJKLMNOPQRESUVWXYZ';
str = str + str.toLowerCase();
str + '123456789+/';
let result = str[0b111001] + ... + ... 
// 体积变大了 base64编码格式的文件
```



## fs系统

```javascript
let { unlink, stat, readdir, rmdir } = require('fs').promises;
let path = require('path');
async function preParallDeep(dir) {
  let statObj = await stat(dir);
  if (statObj.isFile) {
    await unlink(dir);
  } else {
    let dirs = await readdir(dir);
    dirs = dirs.map((item) => preParallDeep(path.join(dir, item)));
    await Promise.all(dir);
    await rmdir(dir);
  }
}

```







## 可读流

```javascript
const EventEmitter = require('events');
const fs = require('fs');
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.offset = 0;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.heigWaterMark = options.heigWaterMark || 64 * 1024;
    this.mode = options.mode || 438;
    this.actionClose = options.actionClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.flowing = null;
    this.open(); // open异步
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read);
    }
    let buf = Buffer.alloc(this.heigWaterMark);
    fs.read(
      this.fd,
      buf,
      0,
      this.heigWaterMark,
      0,
      this.offset,
      (err, byteRead) => {
        this.offset += byteRead;
        if (byteRead > 0) {
          this.emit('data', buf);
          this.read();
        } else {
          this.emit('end');
        }
      }
    );
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit('open', this.fd);
    });
  }
}

module.exports = ReadStream;

```



## 可写流

```javascript
// 可读流 可写流
const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.heiWaterMark = options.heiWaterMark || 16 * 1024;
    this.encoding = options.encoding || 'utf8';
    this.start = options.start || 0;
    this.mode = options.mode || 0o666;
    this.flags = options.flags || 'w';

    this.cache = []; /** 缓冲区 */

    this.writing = false; /** 文件是否处在写的状态中 */

    this.len = 0; /** 当先写入的长度 */

    this.needDrain = false; /** 触发drain时间 */

    this.offset = this.start; /** 写文件的偏移量 */
    /**
     * 打开文件
     */
    this.open();
  }

  /**
   * 写文件
   */
  _write(chunk, encoding, clearBuffer) {
    if (typeof this.fd !== 'number') {
      this.once('open', () => {
        return this._write(chunk, encoding, clearBuffer);
      });
    }

    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, wri) => {
      // wri 写入的真实长度
      this.offset += wri;
      this.len -= wri;
      clearBuffer();
    });
  }
  _clearBuffer() {
    let obj = this.cache.shift();
    if (obj) {
      // this._write(...obj);
      this._write(obj.chunk, obj.encodeing, () => {
        obj.callback && obj.callback();
        this._clearBuffer();
      });
    } else {
      if (this.needDrain) {
        this.needDrain = false; /** 重新触发 */
        this.writing = false; /** 向文件里写 */
        this.emit('drain');
      }
    }
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit('open', this.fd);
    });
  }
  write(chunk, encodeing = this.encoding, callback) {
    // 缓冲区大小 文件IO

    /** 数据格式转化成Buffer */
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    let flag = this.len < this.heiWaterMark;

    this.needDrain = !flag;
    if (this.writing) {
      this.cache.push({
        chunk,
        encodeing,
        callback,
      });
    } else {
      this.writing = true;
      this._write(chunk, encodeing, () => {
        this._clearBuffer();
        callback && callback();
      });
    }
    return flag;
  }
  end(chunk, encodeing) {
    if (chunk) {
      this._write(chunk, encodeing);
    }

    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
}

```

