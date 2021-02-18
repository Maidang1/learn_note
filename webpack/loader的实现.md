## babel-loader

```javascript
let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
function babelLoader(code) {
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  babel.transform(
    code,
    {
      ...options,
      sourceMap: true,
      filename: this.resourcePath.split('/').pop(),
    },
    function (err, result) {
      cb(err, result.code, result.map);
    }
  );
}

module.exports = babelLoader;

```



## banner-loader

```javascript
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(code) {
  this.cacheable && this.cacheable();
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  let shcema = {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
    },
  };
  validateOptions(shcema, options, 'banner-loader');
  if (options.filename) {
    this.addDependency(options.filename); // 添加文件依赖
    fs.readFile(options.filename, 'utf8', function (err, data) {
      cb(err, `/**${data}**/${code}`);
    });
  } else {
    cb(null, `/**${options.text}**/${code}`);
  }
}

module.exports = loader;

```



## file-loader

```javascript
let loderUtils = require('loader-utils');
function loader(code) {
  let filename = loderUtils.interpolateName(this, '[hash].[ext]', {
    content: code,
  });
  this.emitFile(filename, code);
  return `module.exports = "${filename}"`;
}
loader.raw = true; // 二进制
module.exports = loader;

```



## url-loader

```javascript
let loderUtils = require('loader-utils');
let mime = require('mime');
function loader(code) {
  let { limit } = loderUtils.getOptions(this);

  if (limit && limit > code.length) {
    return `module.exports="data:${mime.getType(
      this.resourcePath
    )};base64,${code.toString('base64')}"`;
  } else {
    return require('./file-loader').call(this, code);
  }
}
loader.raw = true; // 二进制
module.exports = loader;

```



## css-loader

```javascript
function loader(code) {
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  let arr = ['let list = []'];
  while ((current = reg.exec(code))) {
    let [matchUrl, g] = current;
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(code.slice(pos, last))})`);

    pos = reg.lastIndex;
    // g 替换成 require写法
    arr.push(`list push('url('+require(${g})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(code.slice(pos))}) `);
  arr.push(`module.exports = list.json('')`);
  return arr.join('\n');
}
module.exports = loader;

```



## less-loader

```javascript
let less = require('less');
function loader(code) {
  let css;
  less.render(code, function (err, r) {
    css = r.css;
  });
  return css;
}

module.exports = loader;

```



## style-loader

```javascript
let loaderUtils = require('loader-utils');
function loader(code) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(code)};
    document.head.appendChild(style);
  `;

  return str;
}

loader.pitch = function (remainingRequest) {
  let str = `
  let style = document.createElement('style');
    style.innerHTML = ${loaderUtils.stringifyRequest(
      this,
      '!!' + remainingRequest
    )};
    document.head.appendChild(style);
  `;
};

module.exports = loader;

```

