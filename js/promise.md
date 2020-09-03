#### 前置知识

- 宏任务
  - script
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI rendering
- 微任务
- event loop 执行的顺序
  - 一开始整个脚本作为一个宏任务执行
  - 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
  - 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
  - 执行浏览器 UI 线程的渲染工作
  - 检查是否有 Web Worker 任务，有则执行
  - 执行完本轮的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

作者：LinDaiDai\_霖呆呆
链接：https://juejin.im/post/6844904077537574919
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 基础题目

### 题目一

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
});
console.log("1", promise1);
```

> 'promise1'
> 1 Promise{\<pending\>}

### 题目二

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve("success");
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

> 1 2 4 3

### 题目三

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

> 1 2 4

- 在 Promsie 中没有去改变 Promise 的状态 .then()中的方法不会被执行

### 题目四

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
```

> 'promise1' '1' Promise{\<resolved\> 'resolve1'} 2 Promise{\<pending\>} 'resolve1';

- 注: 先执行 Promise 中的构造方法 resolve('resolve1') 状态保存 promise.then() 微任务 宏任务执行完在执行微任务

### 题目五

```javascript
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
fn().then((res) => {
  console.log(res);
});
console.log("start");
```

> 1 'start' 'success';

- 注 调用 then()之前 Promise 已经构造完毕 会执行构造函数里面的内容 console.log(1) 会先执行

### 题目六

```javascript
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then((res) => {
  console.log(res);
});
```

> 'start' 1 "success"

## Promise + setTimeout

### 题目一

```javascript
console.log("start");
setTimeout(() => {
  console.log("time");
});
Promise.resolve().then(() => {
  console.log("resolve");
});
console.log("end");
```

> 'start' 'end' 'resolve' 'time'

- 注: 整个脚本一开始是宏任务 settimeout 放入宏任务队列 Promise.then() 微任务 宏任务--> 微任务 --> 宏任务

### 题目二

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```

> 1 2 4 timerStart timerEnd Promise{\<resolved\> success}

### 题目三

```javascript
// (1)
setTimeout(() => {
  console.log('timer1');
  setTimeout(() => {
    console.log('timer3')
  }, 0)
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')

// (2)
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')

// (3)
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
```
> start timer1 timer2 timer3
> start timer1 timer2 'promise'
> start promise1 timer1 promise2 timer2