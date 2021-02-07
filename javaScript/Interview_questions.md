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

