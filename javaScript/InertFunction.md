## Inert Function

### Example 1

```javascript
// Pollution situation
var timeStamp = null;
function getTimeStamp() {
  // if will be called many times
  if (timeStamp) {
    return timeStamp;
  }
  timeStamp = new Date().getTime();
  return timeStamp;
}
```

### Example 2

```javascript
var getTimeStamp = (function() {
  var timeStamp = new Date().getTime();
  return function() {
    return timeStamp;
  };
})();
// every time the  IIFE (Immediately Invoked Function Expression) run, they will return a new state not the first
```

### Example 2

```javascript
var getTimeStamp = function() {
  var timeStamp = new Date().getTime();
  getTimeStamp = function() {
    return timeStamp;
  };
  return getTimeStamp();
};
// The function changes its state internally
```

<!-- > 惰性函数表示函数执行的分支只有函数在第一次调用的时候执行， 在第一次调用的过程中 该函数被覆盖为另一个按照合适的方式执行的函数 这样任何对原函数的调用就不用在经过执行的分支了 -->

> An inert function means that the branch of a function is executed only when the function is called the first time. During the first call, the function is covered with another function that is executed in a proper way, so that any call to the original function does not need to be performed in the branch taken

## Appliance

```javascript
var addEvent = (function(){
  if(window.addEventListener) {
    return function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    } else if(window.attachEvent) {
      return function(el,type,fn) {
        el.attachEvent('on' + type, function(){
          fn.call(el)
        })
      } else {
        return function(el, type, fn) {
          el['on' + type] = fn;
        }
      }
    }
  }
})()


//

var addEvent = function(el, type, fn, capture) {
  if(el.addEventListener) {
    addEvent = function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    }
  } else if(el.attachEvent) {
    addEvent = function(el, type, fn) {
       el.attachEvent('on' + type, function(){
          fn.call(el)
        })
    }
  } else {
    addEvent = function(el, type, fn) {
      el['on' + type] = fn
    }
  }
  addEvent()
}

```
