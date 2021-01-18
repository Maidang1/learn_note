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

