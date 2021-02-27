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

> 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法



## 接口使用

```typescript
/* 索引接口 */
interface RoleDic {
  [id: number]: string;
}
const role1: RoleDic = {
  0: 'super_admin',
  1: 'admin',
};
const role2: RoleDic = {
  s: 'super_admin', // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
  a: 'admin',
};
const role3: RoleDic = ['super_admin', 'admin'];


/* readonly 属性 */
interface RoleDic {
  readonly [id: number]: string;
}

/* 混合接口类型 */
interface Counter {
  (): void;
  count: number;
}
const gerCounter = (): Counter => {
  const c = () => {
    c.count++;
  };
  c.count = 0;
  return c;
};

/* 接口类型 */
interface Vegetables {
  color: string;
}
interface Food {
  type: string;
}
interface Tomato extends Food, Vegetables {
  radius: number;
}
```



## 函数

```typescript
interface Add {
  (x: string, y: string): string;
}
/*
	type Add = (x: number, y: number) => number;
*/

let add: Add = (a, b) => a + b;

```



## 泛型

```typescript
interface GetArray<T> {
  (arg: T, times: number): T[];
  tag: T;
}

const getArr = (): GetArray<number> => {
  const c = (arg: number, times: number) => {
    return new Array(times).fill(arg);
  };
  c.tag = 1;

  return c;
};

/* 泛型约束 */
interface ValueWithLength {
  length: number;
}
const getLength = <T extends ValueWithLength>(param: T): number => {
  return param.length;
};

getLength("abc"); // 3
getLength([1, 2, 3]); // 3
getLength({ length: 3 }); // 3
getLength(123); // error 类型“123”的参数不能赋给类型“ValueWithLength”的参数



/* 类型参数 */
const getProp = <T, K extends keyof T>(obj: T, prop: K) => {
  return obj[prop];
};

```

