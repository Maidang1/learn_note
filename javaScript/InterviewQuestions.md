## deepcopy

```javascript
function deepCopy(obj) {
  if (!obj instanceof Object || obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (obj instanceof Function) {
    return function () {
      obj.call(this, ...arguments);
    };
  }
  var res = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) res[key] === null;
      else {
        res[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
    }
  }

  return res;
}
```

## 函数柯里化

```javascript
// es5
function curry(fn, ...args) {
  return fn.length<=args.length? fn(...args): curry.bind(null, fn, ...args)
}


function curry(fn,args) {
  let len = fn.length;
  args = args|| []
  
  return function() {
    let subArgs = args.slice(0)
    for(let i=0; i< arguments.length;i++) {
      args.push(arguments[i]);
    }
    if(subArgs.length >= fn.length) {
      return fn.apply(this, subArgs)
    }
    else {
      return curry.call(this, fn, subArgs)
    }
  }
} 





function add(x, y, z) {
  return x+y+z;
}

const res = curry(add, 1,2)(3)
console.log(res)



```

## setTimeout模拟 setInterval

```javascript
function mySetInterval(fn, timeout) {
  var timer = {
    flag: true
  }
  function interval() {
    if(timer.flag) {
      fn();
      setTimeout(interval, timeout)
    }
  }
  setTimeout(interval, timeout)
  return timer;
}
```





## mytypeOf

```javascript
function typeOf(value) {
    if(value === null) {
        return 'null'
    }
    return typeof(value) === 'object'? {
        "[object Object]" : "Object",
        "[object Array]":'Array',
        "[object Number]":"Number",
        "[object String]": "String",
        "[object Boolean]": "Boolean"
    }[({}).toString.call(value)]: typeof(value)
```

## 判断一个对象空对象

```javascript
Object.keys(obj).length === 0
```

## EventEmiter

```javascript
class EventEmiter {
  constructor() {
    this.events = {}
  }
  on(event, handler) {
    let callbacks = this.events[event] || []
  	callbacks.push(handler)
    this.events[event] = callbacks;
    return this
  }
  emit(event, ...args) {
    let callbacks = this.events[event]
    callbacks.forEach(fn => {
      fn(..args)
    })
    return this;
  }
  off(event, callback) {
    let callbacks = this.events[event]
    this.events[event] = callbacks && callbacks.filter(fn => fn !== callback)
    return this
  }
  once(event, callback) {
    let wrapFn = function(...args) {
      callbacks(...args);
      this.off(event, wrapFn)
    }
    return this
  }
}
```

