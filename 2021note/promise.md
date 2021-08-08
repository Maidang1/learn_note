## 高阶函数

> 一个函数的参数是一个函数 
>
> 一个函数返回一个函数

### before函数

```javascript
function say() {
    console.log('say')
}

// 给某个方法 执行方法之前调用

Function.prototype.before = function(callback) {
    
    return (...args)=>{
        callback()
        this(...args)
    }
}
let beforeSay = say.before(function(){
    console.log('before say')
})
beforeSay()
```



### 函数柯里化|函数反柯里化

```javascript
function isType(value,type) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

// 细分

function isType(value,type) {
    return function(value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    }
}
let isArray = isType('Array');
let isString = isType('String');


const currying = (fn, arr = []) => {
   let len = fn.length;
    
    return function(...args) {
        let concatValue = [...arr, ...args];
        if(concatValue.length < len) {
            return currying(fn, concatValue)
        } else {
            return fn(...concatValue)
        }
    }
}

let isArray = currying(isType)('Array');
```



### 回调并发问题

```javascript
function after(times, callback) {
    return function() {
        if(--times === 0) {
            callback()
        }
    }
} 

let cb = after(2, function(){
    console.log(school)
})

fs.readFile('./name.txt', 'utf8', function(err,data) {
    school.name = data;
    cb()
})
fs.readFile('./age.txt','utf8',function(err, data) {
    school.age = data;
    cb()
})

```



### 观察者模式

```javascript
// 观察者 被观察者  收集观察者 通知观察者


class Subject { // 被观察者
    constructor(name) {
        this.state = "XXXX";
        this.name = name
        this.observers = []
    }
    attach(o) {
        this.observers.push(o)
    }
    setState(newState) {
        this.state = newState;
        this.observers.forEach(fn => fn.update(this))
    }
    
}
class Observer { // 观察者
    constructor(name) {
        this.name = name
    }
    update(s) {
        console.log(s)
    }
}
let s = new Subject();
let o = new Observer();
s.attach(o)
s.setState('XXXX')
```



### promise

```javascript
// 第一版
const RESOLVED = 'RESOLVED'
const REJECT = 'REJECT'
const PENDING = 'PENDING'
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        let resolve = (value) => {
            if(this.status === PENDING) {
                this.value = value
            	this.status = RESOLVED
            }
            
        }
        let reject = (reason) => {
             if(this.status === PENDING) {
                 this.reason = reason;
            	this.status = REJECT
             }
        }
        
        try {
            executor(resolve,reject)
        } catch(e) {
            reject(e)
        } 
    }
    then(onFulfilled, onRejected) {
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECT) {
            onRejected(this.resson)
        }
    }
}
```



```javascript
// 第二版 解决了异步调用的问题
const RESOLVED = 'RESOLVED'
const REJECT = 'REJECT'
const PENDING = 'PENDING'
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []
        this.onRejectCallbacks = []
        let resolve = (value) => {
            if(this.status === PENDING) {
                this.value = value
            	this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
            
        }
        let reject = (reason) => {
             if(this.status === PENDING) {
                 this.reason = reason;
            	this.status = REJECT
                 this.onRejectCallbacks.forEach(fn => fn())
             }
        }
        
        try {
            executor(resolve,reject)
        } catch(e) {
            reject(e)
        } 
    }
    then(onFulfilled, onRejected) {
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECT) {
            onRejected(this.resson)
        }
        if(this.stauts === PENDIGN) {
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectCallbacks.push(()=> {
                onRejected(this.resson)
            })
        }
        
        
    }
}
```



```javascript
// 第三版 解决了异步调用的问题
const RESOLVED = "RESOLVED";
const REJECT = "REJECT";
const PENDING = "PENDING";
const resolvePromise = (promise2, x, resolve, reject) => {
  // 循环引用
  if (promise2 === x) {
    // es6-promise bluebird q
    return reject(new TypeError("Chaining cycle deleted"));
  }
  let called = false;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // promise
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 是一个promise
        // 不能写成 x.then 取值的话会报错
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, resolve);
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectCallbacks = [];
    let resolve = (value) => {
      if(value instanceof Promise) {
          return value.then(resolve,reject)
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  catch(err) {
      return this.then(null, err)
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECT) {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });

    return promise2;
  }
}

/**
1 promise 成功或者失败的回调的返回值 会传递到外层的下一个then
2 如果返回的是一个普通值的话 传递给下一个成功的回调函数 出错的话 下一个失败的回调函数
返回promise的话 会根据俄promsie状态判定
3 出错处理 找自己最近的一个then 
4 每次then都会返回一个新的promise
**/
```



### Promise 静态方法

```javascript
class Promise {
    ......
    
    static resolve(val) {
        return new Promise((resolve, reject) => {
            resolve(val)
        })
    }

	static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
	static all(promises) {
        return new Promise((resolve, reject) => {
  				
            let result = []
            let times = 0;
            function processData(index,val) {
                result[index++] = val;
                if(++times === promises.length) {
                    resolve(result)
                }
            }
            for(let i=0;i<promises.length;i++) {
                let p = promises[i];
                if(isPromise(p)){
                    p.then(data => {
                        processData(i,data)
                    },reject)
                } else {
                    processData(i,p)
                }
            }
        })
    }
}

Promise.prototype.finally = function(fn){
    return this.then(data => {
        // 等待 
        return Promise.resolve(fn()).then(()=>data)
    },err => {
        return Promise.resolve(fn()).then(()=> {
            throw err
        })
    })
}
```

