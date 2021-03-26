```typescript
'use strict';
var a = 10;
// 代码里面有 export import 之类的代码 这个文件就是一个模块
// !在一个作用域内 相同的变量名只会声明一次
export {};

let name: string = 'zhufeng1';
let age: number = 10;
let married: boolean = false;
let interests: Array<string> = ['2'];

// 元组

let arr: [number, string] = [1, '2'];

enum Gender {
  boy,
  girl,
}

/** -------------- */
let Gender2 = {
  0: 'boy',
  1: 'girl',
  girl: 2,
  boy: 0,
};

// 常数枚举

// 会直接编译成常量 不会编译成对象

// 任意类型 anyscript

// void 类型

function greeting(name: string): void {
  console.log('hello');
}

// never 永远不会出现的类型
let root: HTMLElement | null = document.getElementById('root');
root!.style.color; // 断言不为空

// 类型推论

let nms = 1; // number

let num3; // any

// 包装对象 自动的在基本类型和对象类型之间切换

let name1: string = 'zhufeng';
name1.toLocaleLowerCase();

/**
  let name11 = new String(name1)
  name11.toLocaleLowerCase();
 */

// 类型断言
let nume6: string | number;
(nume6! as string).toLocaleLowerCase();
(nume6! as number).toFixed();

// 自变量类型

type myName = '1' | '2' | '3';


```

