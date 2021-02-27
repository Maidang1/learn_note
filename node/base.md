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



