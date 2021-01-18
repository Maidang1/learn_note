## The era of service-side rendering

![image-20201202224720435](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201202224720435.png)

### question

+ Global refresh
+ Not conducive to team development

## The era of client-side rendering

### [The era of front and rear separation]

![image-20201202230555755](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201202230555755.png)



## Hybrid app development

![image-20201202232308074](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201202232308074.png)

## browser

+ Chrome webkit/blink
+ IE/edge  Trident
+ Opera Presto
+ Firefox Gecko
+ Safari webkit

## The client language

+ ECMAScript 3/5/6
+ DOM (document object model)
+ BOM(browser object model)

# JavaScript

##  variable

+ a name a poiner
+ create a variable var/let/const/

## The basic data type

### number

+ NaN is not equal to any one value (isNaN)

+ isNaN 会有一个机制 Number(val) 然后检测

### 其他类型转化为数字类型

+ Number([val]) 有一个非字符就是NaN  空字符串会变成 0 null 0 undefined NaN
+ 引用类型转化为数字 toString() 然后转化  {xxx}.toString() ==>  [object, object]  [].toString() ==>'' [xx,xx].toString() ==>'xx,xx'

+ parseInt() parseFloat([val], [进制])  正则转化

### string

+ [val].toString()
+ 字符串拼接
+ null 和 undefined 没有 toString()
+ (NaN).toString() = 'NaN'
+ 对象的toString() 重写了toString() 

### boolean

+ 0 NaN '' null undefined ===> false

### undefined / null

+ 都代表没有



## 引用数据类型

### 普通的对象：描述特性的键值对

+ 属性名是数字或者字符串类型的
+ 删除属性 delete xxx

### 数组：特殊的对象类型

+ length 存储数组的长度



![image-20201205172434272](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201205172434272.png)





![image-20201205173121585](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201205173121585.png)

## 数据类型检测

+ typeof [val]
+ instanceof

+ constructor
+ Object.prototype.toString.call()

## 循环

+ for
+ for in 
+ for of
+ while
+ do while

![image-20201205200524984](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201205200524984.png)

+ 匿名函数： 别人驱动触发执行

![image-20201205204133325](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201205204133325.png)



## function

> Function underlying mechanism 

![image-20201211204934190](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20201211204934190.png)

## VO AO (js编译阶段)

> will be written soon.......

## arguments

> **`arguments`** is an `Array-like` object accessible inside [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) that contains the values of the arguments passed to that function(MDN defined)

+ arguments.callee then current function
+ whether **`set`**the arguments  or not, they are exits
+ whether **`pass`**  the arguments  or not, they are exits

## arrow function

::: tip

An **arrow function expression** is a compact alternative to a traditional [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function), but is limited and can't be used in all situations.

:::

### Example

```javascript
let fn = n => m => m + n;
let sum = (...arg) => {
  console.log(arg)
  // arg is an array
}
```

::: warning

An arrow function doesn't have arguments

:::

## Math

+ typeof Math  ==> 'object'



::: tip

if the value passed is not a number, it will be transformed by using `Number()`

:::



## Array

###  origin array will be changed

::: tip

The `push()` method adds one or more elements to the end of an array and returns the `new length` of the array

The `unshift()` method adds one or more elements to the beginning of an array and returns the `new length` of the array

The `shift()` method removes the **first** element from an array and returns that removed element. This method changes the length of the array

The **`pop()`** method removes the **last** element from an array and returns that element. This method changes the length of the array

:::

::: warning

if you remove the first element by using `delete` like `delete arr[0]` it just say the arr as a ordinary object, the can changer the structurer of the arr, the length of the arr not change  also you want to add a element at the begin of an array like `arr[-1] = 10`, it not works either, only add a key `-1` in the array, the length is not change either. but if you want to remove the last element of an array, just write `array.lenth--`, it works

:::

### splice

> splice(n, m) delete m element from n if you are not pass m m = arr.length-1 the part was deleted will be returned
>
> splice(n, m, x) x will replace the part deleted



### the origin array not change

### slice

> slice(n,m) return the the part [ n,m)

### concat

> The `concat()` method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.





