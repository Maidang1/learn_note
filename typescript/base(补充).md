# ts补充知识

```javascript
/*
    布尔类型：boolean
    数值类型：number
    字符串类型：string
    数组：Array<type>或type[]
    对象类型：object
    Symbol类型：symbol
    null和undefined：null 和 undefined，这个比较特殊，它们自身即是类型
*/
```



```typescript
/*
	[string, number]元组类型
*/
// 2.6之后
interface Tuple extends Array<string | number> {
    0: string;
	1: number;
	length:2
}

// 2.6之前
interface Tuple extends Array<string | number> {
    0: string;
	1: number;
}


// void 类型的变量只能赋值为 undefined 和 null
```

> Symbol 类型值作为属性名，这个属性不会被`for…in`遍历到，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`获取到
>
> `Object.getOwnPropertySymbols`方法获取对象的所有symbol类型的属性名
>
> Reflect.ownKeys



```typescript
const key1: unique symbol = Symbol();
let key2: symbol = Symbol();
const obj = {
  [key1]: 'value1',
  [key2]: 'value2',
};
console.log(obj[key1]);
console.log(obj[key2]); // error 

```

> const enum*(完全嵌入的枚举)*，在之前讲的定义枚举的语句之前加上`const`关键字，这样编译后的代码不会创建这个对象，只是会从枚举里拿到相应的值进行替换