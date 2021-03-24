## observer

```javascript
// 观察一个数据
// 只针对 对象 数组没有使用 defineProPety

let data = { name: 'zf' };

let arrayProro = Array.prototype;
let proto = Object.create(arrayProro);

['push', 'shift', 'splice'].forEach((method) => {
  proto[method] = function (...args) {
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    ArrrayObserver(inserted);
    arrayProro[method].call(this, ...args);
  };
});

function ArrrayObserver(obj) {
  for (let i = 0; i < obj.length; i++) {
    let item = obj[i];
    observer(item);
  }
}

function observer(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    /** 处理数组 */
    // push shift splice
    Object.setPrototypeOf(obj, proto);
    ArrrayObserver(obj);
  } else {
    for (let key in obj) {
      // 默认值循环第一层
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  observer(value); // 递归所有的数据
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (value !== newValue) {
        observer(newValue);
        value = newValue;
        console.log('视图更新');
      }
    },
  });
}

// 增加不存在的属性 不能更新视图
// 如果数组中 对象是支持响应式的 常量不可以
```
