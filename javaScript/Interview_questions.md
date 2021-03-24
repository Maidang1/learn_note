## call && apply

> fn.call(obj, 1,2,3,4)
>
> fn.apply(obj, [10, 20, 30])
>
> call 的性能好一些

## (5).add(3).minus(2)

```javascript
;(function(){
  function check(n) {
     n = Number(n);
     return isNaN(n)?0:n;
  }
  function add(n) {
    n = check(n);
    return this + n; 
  }
  function miuns(n) {
    n = check(n);
    return this - n;
  }
  ['add', "minus"].forEach(item => {
    Number.prototype[item] = eval(item)
  })
})()
```



## arrow functin && function

> 箭头函数更简洁
>
>  箭头函数没有自己的`this`, `this` 继承函数处所属上下文使用（call 和 apply 无用） 
>
> 箭头函数没有 arguments 但是有...arg 
>
> function 可以用 new 生成实例  箭头函数不能new 没有 this 箭头函数没有prototype   



```javascript
Array.prototype.each = function(fn, obj = window) {
  var res = []
	for(var i=0; i< this.length;i++) {
    var item = this[i];
    var index = i;
    var result = fn.call(obj, item, index)
    if(result !== false) {
      res.push(result)
    } else {
      break;
    }
  }
  return res;
}


var arr = [1,2,3,4,5, "AA", 10]
var res = arr.each(function(item, index){
  if(isNaN(item)) {
    return false
  }
  return item * 10;
}, null)


console.log(res)
```



## add(1)(2)

```javascript
let obj = {
  name: "OBJ",
};

function fn(...args) {
  console.log(this, args);
}

document.body.onclick = fn; // =>this BODY

document.body.onclick = function (ev) {
  // ev事件对象 函数触发的时候 会把信息传给函数
};

document.body.onclick = fn.bind(obj, 100, 200);

document.body.onclick = function (ev) {
  fn.call(obj, 100, 200, ev);
};

(function () {
  function myBInd(context = window, ...outArg) {
    let fn = this;
    return function (...innerArg) {
      fn.call(context, ...outArg.concat(innerArg));
    };
  }

  Function.prototype.myBInd = myBInd;
})();

// 闭包 保存和保护
```



```javascript
function currying(fn, length) {
    length = length || fn.length;
    return function(...args) {
        if(args.length >=length) {
            return fn(...args)
        }
        return currying(fn.bind(null, ...args), length - args.length)
    }
}

function add(n1, n2, n3) {
    return n1 + n2 + n3;
}

add = currying(add, 4);
```



## 旋转数组

```javascript
function roreate(arr, k) {
    if(k<=0 || k % arr.length === 0) return arr;
    k = k % arr.length;
    arr = arr.slice(-k).concat(arr.slice(0, arr.length - k))
    return arr;
}


function roreate(arr, k) {
    if(k<=0 || k % arr.length === 0) return arr;
    k = k % arr.length;
    return [...arr.splice(arr.length - k), ...arr]
}
```



## 数组

```javascript
let obj = {
    2:3,
    3:4,
    length:2,
    push: Array.prototype.push
}

obj.push(1)
obj.push(2)
```



## == & ===

```javascript
{} == {} // false 地址比较
null == undefined // true
NaN == NaN // false
[12] == '12' true // 对象和字符串 对象toString()
// 其他的转化为数字
// 对象转数字 对象 -----> 字符串----> 数字
// undefined NaN
```



```javascript
var a = {
    n: 0,
    toString:function() {
        return ++this.n
    }
}

Object.defineProperty(window, "a", {
    get: function() {
        console.log(this)
        this.value ? this.value ++: this.value = 1;
        return this.value
    }
})

if(a == 1 && a == 2 && a == 3) {
    console.log(1)
}
```





```javascript
let fn = function AAA() {
    console.log(AAA) //OK
    // AAA 不可以修改类似于 常量
}
// AAA() AAA is not defined


var b = 10;
(function b() {
    b = 20;
    console.log(b) // function
})()
console.log(b) // 10


var b = 10;

(function b(/* b */){
    var b = 20;
    console.log(b) // 20
})()
console.log(b) // 10

```



```javascript
for(var i = 0; i < 10; i++) {
    setTimeout(()=>{
        console.log(i)
    }, 100)/ 10
}
```





```javascript
function _new(fn, ...args) {
    let obj = {};
    obj.__proto__ = Fn.prototype;
    let res = fn.call(obj, ...args);
    return obj;
    
}
```



```javascript
// 扁平化
arr = arr.toString().split(',').map(item => Number(item))
arr = arr.flat()

while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
}

```



```javascript
reg = /\b[a-z]\b/ig
str = str.replace(reg, value => {
    return ' ' + value + ' '
}).trim()
```



```javascript
/*
	实现一个$attr(name, value)
	属性为name
	值为value的元素集合
*/
let ary = $attr('class', 'box')
function $attr(property, value) {
    let elements = document.getElementsByTagName('*'),
        arr = [];
    
    [].forEach.call(elements, item => {
        let itemValue = item.getAttribute(property);
        if(property === 'class') {
            
            new RegExp('\\b + value + \\b').test(itemValue)?arr.push(item):null
            return 
        }
        if(value === itemValue) {
            arr.push(item)
        }
    })
    return arr;
}

```





```html
<div class="imgBox">
    <img src="" data-img="XXXX"/>
</div>
```



```javascript
/* 代码实现图片懒加载 */

let $imgBox = $("imgBox"),
  $img = $imgBox.children("img"),
  $window = $(window);
$(window).on("load, scroll", function () {
  if ($img.attr("isLoad") === "TRUE") {
    return;
  }
  let $A = $imgBox.outerHeight() + $imgBox.offset().top,
    $B = $window.outerHeight() + $window.scrollTop();

  if ($A <= $B) {
    $img.attr("src", img.attr("data-img"));
    $img.on("load", function () {
      $img.css("display", "block");
    });
  }
  $img.attr("isLoad", "TRUE");
});


```



## call 实现

```javascript
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  let r = eval("context.fn(" + args + ")");
  delete context.fn;
  return r;
};

```



## apply

```javascript
Function.prototype.apply = function (context, args) {
  context = context ? Object(context) : window;
  context.fn = this;
  if (!args) {
    return context.fn();
  }
  let r = eval("context.fn(" + args + ")");
  delete context.fn;
  return r;
};
```



## new实现

```javascript
function mockNew() {
    // 拿到构造函数就是传进来的一个函数
  let Constructor = [].shift.call(arguments);
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  let res = Constructor.apply(obj, arguments);
  return res instanceof Object ? res : obj;
}
```



## bind

```javascript
// bind可以绑定this执行
// 返回新的函数
// 如果绑定的函数被new了 当前函数的this就是当前函数的实例

Function.prototype.bind = function (context) {
  let that = this;
  let bindArgs = Array.prototype.slice.call(arguments, 1);
  function Fn() {} // Object.create() 原理
  Fn.prototype = this.prototype;
  fBound.prototype = new Fn();
  return function fBound() {
    let args = Array.prototype.slice.call(arguments);
    return that.apply(
        // 判断是不是new出来的 如果是new出来的 this应该指向new出来的对象
      this instanceof fBound ? this : context,
      bindArgs.concat(args)
    );
  };
};

```



## 0.1 + 0.2 != 0.3

> 进制转化
>
> 0.1 * 2 = 0.2
>
> 0.2 * 2 = 0.4
>
> 0.4 * 2 = 0.8
>
> 0.8 * 2 = 1.6 - 1 = 0.6
>
> 



## instanceof

```javascript
function instanceOf(A, B) {
    B = B.prototype
    A = A.__proto__
    while(true) {
        if(A === null) {
            return false
        }
        if(A === B) {
            return true
        }
        A = A.__proto__
    }
}

// instanceof 不能校验原始类型

class ValidataStr {
    static [Symbol.hasInstance](x) {
        return typeof x === 'string'
    }
}
```



## 执行上下文栈和作用域链

```javascript
function a() {}
function b() {}
function c() {
    console.log("welcome")
}
a()

/*
ESC = [
	globalContext
]
ESC.push(functionAContext)
ESC.push(functionBContext)
ESC.push(functionCContext)
ESC.pop()
*/

/*
	作用域链
	[[scope]]
	
a.[[scope]] = {
	globalContext.VO
}
b.[[scope]] = {
	aContext.AO
	globalContext.VO
}
c.[[scope]] = {
	bContext.AO
	aContext.AO
	globalContext.VO
}

*/

var a = 1;
function sum() {
    var b = 2;
    return a + b;
}

sum()

/*
	sum.[[scope]] = {
		globalContext.VO
	}
	ESC = [
		globalContext;
		sumContext
	]
	sumContext = {
		AO: {
			arguments: {
				length: 0
			}
			b: undefined
		}
		Scope:[AO, sum.[[scope]]]
	}
	
	AO: {
		arguments: {
				length: 0
			}
			b: 2
	}
	
	ECS.pop()
*/
```



## 变量提升

```javascript
/*
	js作用域 今静态的 定义的时候产生
	执行上下文 EC
	全局上下文 和 函数上下文
	
	变量对象 Variabl objecct VO 作用域链 this

*/

var a  = 100;
function sum() {
    
}


/*
	VO(globalContext) {
		a: 100,
		sum: ref to function sum
	}
*/


/*
	执行上下文周期 创建阶段 代码执行阶段
	 VO ===>  AO
*/


function sum(a, b) {
    var c = 10;
    var d = function() {}
    function total() {}
    b = 10;
} 

sum(10)

/*
	1. 找形参 没有实参 就用undefined代替 
	2. 找函数声明(function xxx() {})
*/

/*
	vo(sum) { 创建阶段
		a: 10,
		b: undefined,
		total: ref to function total 后面会覆盖前面的
		d: undefined
	}
*/

```



## 类型转换

```javascript
let obj = {
    
    [Symbol.toPrimitive]() {
        
    },
    valueOf() {
        
    },
    toString() {
        
    }
}
```



## 比较运算

```javascript
'a' < 'b' // ascii
1 < '123' // String ----> Number 不能变成数字就会false

// == 
null == undefined // true
// null 和 undefined  和其他比较的时候都是false

// 对象和对象比较都是false 地址空间转化
NaN == NaN //false


// 优先级
// 单目运算符优先级高
[] == ![] ==> [] == false ==> [] == 0 ==> [].valueOf() ===> [].toString() ==> '' == 0 ==> 0 == 0 // true
```



## 深拷贝和浅拷贝

```javascript
function deepClone(obj, hash = new WeakMap) {
    if(obj == null) return obj;
    
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return RegExp(obj);
    
    if(typeof obj !== 'object') return obj;
    
    if(hash.get(obj)) return hash.get(obj); // 解决循环引用
    // [] {} 
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj)
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    
    return cloneObj
}
```



## 原型和原型链

```javascript
/*
	函数有prototype
	对象有__proto__
*/
```



## 数据类型检测

```javascript
/*
	Number Boolean Bigint undefined null Object Symbol 
*/

/******************  typeof  *********************/
function func(n, m, cb) {
    // 默认值
    typeof m === 'undefined'? m = 0 : null
    n === undefined? n = 0 : null
    typeof cb === 'function' ? cb() : null // 严谨
}


function (10, 20, function anonymous(){})

/******************  isntanceof  *********************/
let arr = [],
    reg = /^$/;
arr instanceof Array

/********************** 问题 **********************/
/*
	1. 不能处理基本的数据类型
	2. 只要在原型链上都行
*/



/******************  构造函数  *********************/

/*
	在类的原型链上都会有constructor属性 存储类
*/
let n = 12;
n.constructor === Number
arr.constructor === Array
obj.constructor === Object



/******************  Object.prototype.toString.call()  *********************/

```



## 封装类型检测的库

```javascript
let _obj = {
    isNumber: "Number",
    isFunction: "Function",
    isWindow: "Window",
    isBoolean: "Boolean",
    isString: "String",
    isNull: "Null",
    isUndefined: "Undefined",
    isSymbol: "Symbol",
    isPlainObject: "Object",
    isArray: "Array",
    isReg: "RegExp",
    isDate: "Date",
  },
  _tostring = obj.tostring,
  _type = {};

for (var key in obj) {
  if (!_obj.hasOwnProperty(key)) break;
  _type[key] = (function () {
      // 闭包
    var reg = new RegExp("\\[object " + _obj[key] + " \\]");
    return function (value) {
      return reg.test(_tostring.call(val));
    };
  })();
}

```

