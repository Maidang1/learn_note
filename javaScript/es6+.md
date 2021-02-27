# ES7

## includes

```javascript
arr.includes()
```



## 2 ** 2

```javascript
Math.pow(2,2) // 2^2
```



# ES8

+ async/await

+ Object.keys
+ Object.values
+ Object.entries

```javascript
for(let [key, v] of Object.entries(xx)) { // 对象变成可遍历的
    console.log(key, v)
}
```

+ padStart/padStart

```javascript
for(let i = 1; i < 32; i++) {
    console.log(i.toString().padStart(2, '0'))
}
```

+ defineProperty

```javascript
const data = {a:1, b: 2}
Object.defineProperty(data, 'a', {
    enumrable: false
})

Object.getOwnPropertyDescriptors(data)
```





# ES9

+ For await of

```javascript
function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for (let item of arr) {
        console.log(Date.now(), item.then(console.log))
    }
}

test()
// 1560090138232 Promise {<pending>}
// 1560090138234 Promise {<pending>}
// 1560090138235 Promise {<pending>}
// 100
// 2000
// 3000
```



```javascript
function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for (let item of arr) {
        console.log(Date.now(), await item.then(console.log))
    }
}

test()
// 2000
// 1560091834772 undefined
// 100
// 1560091836774 undefined
// 3000
// 1560091836775 undefined
```



```javascript
function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}

test()
// 1560092345730 2000
// 1560092345730 100
// 1560092346336 3000
```



## Object.Rest && Spread

```javascript
let a = {}
let b = {}
let com = {
    ...a,
    ..b
}

let a = {
    a:1,
    b:2,
    c:3,
    d:4
}


const {a, b, ...rest} = a;
```









# ES10

## JSON.stringify()

> 0xD800-0xDFFFF 能力增强



##  arr.flat()扁平化输出

```javascript
arr.flat(depth)
```



## arr.flatMap()

```javascript
[1,2,3,[1,2]].flatMap(item => {
    item * 2
})// 先map 在flat


```



## trimStart() trimLeft() trimRight() trimEnd() trime()

> 去除空格





## matchAll

```javascript
function select(regExp, str) {
    const matchs = []
    str.replace(regExp, function(all, first) {
        matchs.push(first)
    })
    return matchs
}



function select(regExp, str) {
    const matchs = []
    for(const match of str.matchAll(regExp)) {
        matchs.push(match)
    }
    return matchs
}
```



## fromEntries

```javascript
const arr = [['foo', 1], ['bar', 2]]

const obj = Object.fromEntries(arr)
```



## Entries

```javascript
const obj = {
    abc:1,
    def:2,
    g:3
}
let res =Object.fromEntries(
	Object.Entries(obj).filter(([key, value]) => key.length === 3)
)

console.log(res)
```



