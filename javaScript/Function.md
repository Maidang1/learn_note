## Function

```javascript
var test = new Function('a', 'b', 'c', 'console.log(a + b + c )');
```



```javascript
var a = 1,
    b = 2;

function test() {
  var b = 3;
  return new Function('c', 'console.log(a + b + c)')
}
var t = test();
t(4) // 7   全局的作用域 不会生成闭包 浏览器环境 访问的是顶级作用域和自己的作用域 window

// node 环境下 报错 找不到 global

new Function() 和 Function 没有区别

Function.__proto__ === Function.prototype // true

```



## 应用

### es6 ------> es5

#### server/app.js

```javascript
var express = require('express');
var bodyParser = reuqire('body-parser')
const {urlencoded, json} = bodyParser;
const app = express();

app.use(urlencoded({extended: true}))
app.use(json())
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin'，"*");
  res.header('Access-COntrol-Allow-Method', 'POST|GET')
  next();
})

app.post('/transfet', (req, res) => {
  let _c = req.bodu.code;
  _c = _c.replace(/[let|const/g, 'var')
  res.send(_c)
  
})
```

#### index.js

```javascript
import $ from 'jquery'

let code = `
	let a = 1;
	const b = 2;
	a = a + b;
	console.log(a)
`

$.ajax({
  url,
  type:'POST',
  data: {
    code
  },
  success(data) {
   const fn = Function(data)
  }
})

```