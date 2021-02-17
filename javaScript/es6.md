# ES6基础知识

```javascript
class Fn {
  constructor() {
    this.x = 200;
  }
  // Fn.queryX
  static queryX() {}
  // 直接写方法是加在原型上面的 Fn.prototype.getx
  getX() {
    console.log(this.x);
  }
   y = 200 // 实例的私有属性
   static x = 400 // 类的私有属性
}
```

## Object.setPrototypeOf  Object.getPrototypeOf



## 类的编译

+ 编译前

```javascript
class parent {
  static age = 10;
  constructor(name) {
    this.name = name;
  }
  age = 10;
  getName() {
    return this.name;
  }

  static sayHello() {
    console.log("hello");
  }
}
```

+ 编译后

```javascript
"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var parent = /*#__PURE__*/ (function () {
  function parent(name) {
    _classCallCheck(this, parent);

    _defineProperty(this, "age", 10);

    this.name = name;
  }

  _createClass(
    parent,
    [
      {
        key: "getName",
        value: function getName() {
          return this.name;
        },
      },
    ],
    [
      {
        key: "sayHello",
        value: function sayHello() {
          console.log("hello");
        },
      },
    ]
  );

  return parent;
})();

_defineProperty(parent, "age", 10);

```

> 类只可以new
>
> 类的构造函数如果返回了引用类型 作为继承的this
>
> 类可以继承静态方法

```javascript
function _classCallCheck(instance, contructor) {
  if (!(instance instanceof contructor)) {
    throw new Error("class contructor musut be called new");
  }
}

function definePropertys(targer, arr) {
  for (let i = 0; i < arr.length; i++) {
    Object.defineProperty(targer, arr[i].key, {
      ...arr[i],
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }
}

function _createClass(constructor, protoProperty, staticPropertys) {
  if (protoProperty.length > 0) {
    definePropertys(constructor.prototype, protoProperty);
  }
  if (staticPropertys.length > 0) {
    definePropertys(constructor, staticPropertys);
  }
}

let parent = (function () {
  function p() {
    console.log(this);
    _classCallCheck(this, p);
    this.name = "lisi";
  }
  _createClass(
    p,
    [
      {
        key: "eat",
        value: function () {
          console.log("eat");
        },
      },
    ],
    [
      {
        key: "b",
        value: function () {
          return { b: 2 };
        },
      },
    ]
  );
  return p;
})();

function _inherits(subClass, superClass) {
  // 继承共有属性
  superClass.prototype = Object.create(subClass.prototype, {
    value: subClass,
  });

  Object.setPrototypeOf(subClass, superClass);
}

let children = (function (parent) {
  _inherits(C, parent);
  function C() {
    _classCallCheck(this, C);
    let obj = parent.call(this);
    typeof obj === "object" ? (obj.age = 9) : (this.age = 9);
  }
  return C;
})(parent);

```



## 遍历

```javascript
// for循环
// forEach
// every
// for in 
// for of
```



```javascript
const price = {
    A:[1.5,2.3],
    B:[3,4,5],
    C:[0.5, 1.0]
}

```



```javascript
let args = [].slice.call(arguments)
Array.from(arguments, mapFn, thisArg)

// 伪数组 存储数据索引方式 有何lebgth属性
let arr = Array.form({length:5}, ()=>{
    return 1
})

```



```javascript
let arr = Array.of(1,2,3,4,5);
arr//[1,2,3,4,5]


let arr = new Array(5).fill(1)
arr // [1,1,1,1,1];
// Array.fill(value, start, end)

```

