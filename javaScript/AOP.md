## AOP

```javascript
Function.prototype.before = function(cb) {
  var __self__ = this;
  return function() {
    cb.apply(__self__, arguments)
    return __self__.apply(__self__, arguments)
  }
}

Function.prototype.after = function(cb) {
  var __self__ = this;
  return function() {
    const res = __self__.apply(__self__, arguments);
    cb.apply(__self__, arguments);
    return res;
  }
} 

function test(){
  console.log(1);
  return "AOP"
}
const res = test.before(()=>{
  console.log("before")
}).after(()=>{
  console.log("after")
})()
```

## example

```javascript
// index.js
const express = require('exprress')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const app = express()

app.get('/remove', (req, res) => {
  
  const result = fileOPeration('todo.json', function(todolist) {
    return todolist.filter(todo => todo.id !== 3)
  })
  
  res.send(result)
})

// util.hs
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('fs')


Function.prototype.before = function(cb) {
  var __self__ = this;
  return function() {
    const res = cb.apply(__self__, arguments)
    return __self__.call(__self__, res)
  }
}

Function.prototype.after = function(cb) {
  var __self__ = this;
  return function() {
    const res = __self__.apply(__self__, arguments);
    cb.call(__self__, res);
    return res;
  }
} 


function readFile(path) {
  return readFileSync(resolve(__dirname, path), 'utf8')
}

function writeFile(path, data) {
  writeFileSync(resolve(__dirname, path), JSON.stringfy(data))
}

function fileOPeration(path, fn) {
  return fn.before(()=>{
    return JSON.parse(readFile(path) || '[]')
  }).after((data) => {
    writeFile(path, data)
    return data;
  })()
}



```

