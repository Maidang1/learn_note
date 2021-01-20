###### this 的指向剖析

我认为我们刚学 JavaScript 的时候，特别是学过 java, c++语言的新手，对于 javascript 中的 this 指向会感到困惑。我也是这样，没有掌握 this 的绑定规则对于 this 的各种问题我们就会感到困惑。接下来我就来介绍一下`this的绑定规则`

我们需要了解的是`this`是在`调用`的时候`绑定`的，this 的绑定取决于函数的调用位置(函数在代码中被调用的位置，不是声明的位置)

###### 调用位置分析

```javascript
function baz() {
  // 调用栈 baz
  // 函数的调用位置是全局作用域
  cosole.log('baz');
  bar(); // <--- bar的调用位置
}

function bar() {
  // 调用栈  baz() --->bar()
  // 调用位置在 baz()
  console.log('bar');
  foo(); //  <--- foo的调用位置
}
function foo() {
  // 调用栈 baz() --> bar() --> foo()
  // 调用的位置在bar()
  console.log('foo');
}

baz(); //  baz的调用位置
```

###### 默认绑定

```javascript
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); //2
```

用 var 声明变量的时候，变量会挂载到全局对象上（浏览器是 window）。
调用 foo()的时候是在全局作用域 this 绑定到了全局对象。打印的结果就是 2
注：用 let 声明不可以 let 声明的对象不会绑定到全局对象上

###### 隐式绑定

就是调用的位置有没有上下文对象，或者是是否被某个对象拥有或者包含

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo(); // 2
```

注:对象引用链上之后最后一层的起作用

```javascript
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); //42
```

###### 隐式丢失

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 1,
  foo: foo,
};

var a = 'global';

var bar = obj.foo();
bar(); // global
```

注：bar 是 obj.foo 的一个引用，但是实际上调用的时候还是去调用 foo()函数本身所以还是应用了默认绑定

###### 显示绑定

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
foo.call(obj); // 2
```

###### new 绑定

再说`new绑定`之前我们先要明确一个问题，就是 javascript 中的构造函数和 java，C++
中的构造函数并不一样！javascript 中的构造函数只是在`new`操作符下会执行，他不属
于一个类，也不会实例化一个类。他只是被 new 调用的一个普通函数

new() 会发生下面的操作

- 创建一个全新的对象
- 这个对象进行 prototype 链接
- 新的对象会绑定到函数调用的 this
- 函数调用如果没有返回其他的对象，就会返回这个新对象

```javascript
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log(bar.a); //2
```
