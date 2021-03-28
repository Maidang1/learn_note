```typescript
enum Gender {
  Male,
  Female,
}

let genVal: Gender = Gender.Male;

const enum Test {
  Male,
}

let val: Test = Test.Male;

console.log(val);

let str: any = '6666';

console.log((str as string).length);

// 索引签名
interface name {
  firstName: string;
  lastName: string;
  [propName: string]: string;
}

// 数字索引

interface arrType {
  [index: number]: number;
}

let arr: arrType = [1, 2, 3, 4];

function sayName(obj: name) {
  console.log(obj.firstName + obj.lastName);
}

sayName({ firstName: 'x', lastName: 'x' });

//

let arr2: ReadonlyArray<number> = [1, 2, 4];

// 接口限制函数

interface SumInterface {
  (a: number, b: number): number;
}

let sum: SumInterface = function (x, y) {
  return x + y;
};

// 混合接口 既有对象属性 还存在函数属性

/**
  let count = 0
  function demo(){
    count++;
    console.log(count)
  }

  demo();
  demo();
  demo();

 */

// 函数的本质是对象

interface CounterFace {
  (): void;
  count: number;
}

let getCounter = function (): CounterFace {
  /**
   * CounterFace 要求数据既要是一个没有返回值的函数
   * 有要是一个有Count 属性的对象
   */
  /**
   * fn作为函数的时候符合():void的定义
   * fn作为对象的时候符合接口count属性的定义
   */
  let fn = <CounterFace>function () {
    fn.count++;
    console.log(fn.count);
  };
  fn.count = 0;
  return fn;
};

// 接口继承

function getNum() {
  return 2;
}

enum hah {
  Male = getNum(),
}

// ! 接口兼容性

interface TestInterface {
  name: string;
}

let p1 = { name: 'k' };
let p2 = { age: 19 };
let p3 = { name: 'l', age: 19 };

let t: TestInterface;
t = p3;

// 可多不可少 递归检查

// ! 函数兼容性
// 函数参数个数 可少不可多

let fn1 = (x: number, y: number) => {};
let fn2 = (x: number) => {};
fn1 = fn2;
// 参数类型 必须保持一致
// 返回值类型 必须保持一致
// 函数双向协变 一个的可以赋值给两个的

// ? 参数协变

let fn4 = (x: string | number) => {};
let fn5 = (x: number) => {};
fn4 = fn5;
fn5 = fn4;

// ? 返回值协变

let fn6 = (x: boolean): number | string => (x ? 'abv' : 12);
let fn7 = (x: boolean): number => 2;
fn6 = fn7;
fn7 = fn6;

// ? 函数重载 不能将重载少读的赋值给重载多的 可以将重载多的赋值给重载少的

// ! 枚举兼容

// ? 数字枚举和数值枚举兼容
enum MyGender {
  Male,
  Female,
}

let value: MyGender;

value = MyGender.Female;
value = 1;

// ? 数字枚举和数字枚举不兼容

enum MyGender2 {
  Male,
  Female,
}

enum Animal {
  Male,
  Female,
}

let value2: MyGender;
value2 = MyGender.Female;
value2 - MyGender2.Male;
value2 = Animal.Male;

// ? 字符串枚举

enum myGender3 {
  cat = 'CAT',
}

let animal: myGender3;

animal = myGender3.cat;
animal = 'CAT';

// 类的兼容性 只比较实例成员 不比较构造函数和静态成员

// 类的私有属性和受保护的属性会影响兼容性

// 泛型只会影响使用部分 不会影响声明的部分

/**
 interface TestInterface<T> {
 }


 let p1: TestInterface<number>
 let p2: TestInterface<string>

p1 = p2;
p2 = p1; // ok


 interface TestInterface<T> {
   age:T
 }


 let p1: TestInterface<number> // age: number
 let p2: TestInterface<string> // age: string

p1 = p2;
p2 = p1; // error

 */

// 交叉类型 合在一起的类型

// 联合类型 任意一个类型中的一个

// 类型保护

let getRandomValue = () => {
  let num = Math.random();
  return num > 0.5 ? 'ok' : 12;
};

let value3 = getRandomValue();

if (isString(value3)) {
  console.log(value3.length);
} else {
  console.log(value3.toFixed(2));
}

// 返回的类型是一个布尔类型
function isString(val: string | number): val is string {
  return typeof val === 'string';
}

// typeof 实现类型保护
// 可以保护 number string boolean Symbol
if (typeof value3 === 'string') {
  console.log(value3.length);
} else {
  console.log(value3.toFixed(2));
}

// instanceof 实现类型保

// 非严格模式
// null undefined 可以赋值给任意类型
// null undefined 可以相互赋值

// 对于可选属性来说 开启了 strictNullChecks 就是当前类型 + undefined 类型

// 使用 ! 来去除null undefined检查
// - ! 意思是这个变量不是undefined 或者 null

// 类型别名

type MyString = string;

type MyType<T> = { x: T; y: T };

type myType1 = {
  name: string;
  children?: myType1;
};

// 类型兼容
interface myType2 {
  name: string;
  children?: myType2;
}

let p6!: myType1;
let p7!: myType2;

p6! = p7!;

// 扩展

type myType3 = myType1 & {
  age: number;
};

// type 不会声明合并

// 自变量类型

interface myTestInterface {
  a: string;
  b: number;
  c: boolean;
  d: symbol;
  e: null;
  f: undefined;
  g: never;
}

type myType4 = myTestInterface[keyof myTestInterface];

// 映射类型

type readonlyTestInterface<T> = {
  readonly [P in keyof T]: T[P];
};

type myTestInterfaceCopy = readonlyTestInterface<myTestInterface>;

// 通过 + / - 来指定是添加还是删除 只读和可选修饰符

type readonlyTestInterface2<T> = {
  -readonly [P in keyof T]+?: T[P];
};

// Pick类型

interface TestInterface {
  name: string;
  age: number;
}
type myType5 = Pick<TestInterface, 'name'>;

// Record 类型

type Animal1 = 'person' | 'cat' | 'dog';
interface TestInterface1 {
  name: string;
  age: number;
}

/**
  {
    person: TestInterface1;
    cat: TestInterface1;
    dog:TestInterface1
  }
 */

type myType6 = Record<Animal1, TestInterface1>;

// 条件类型
// 判读前面的类型是不是后面的类型或者是继承豫后面的类型
type myType7<T> = T extends string ? string : any;

type res = myType7<string>;

// 分布式条件检查

type myType8<T> = T extends any ? T : never;

type res1 = myType8<string | number | boolean>;

// Exclude 从T中剔除可以赋值给U的类型

type myType9<T, U> = T extends U ? never : T;

type res2 = myType9<string | number | boolean, number>;

// extract 从T中保留可以赋值给U的类型

type myType10<T, U> = T extends U ? T : never;
type res3 = Extract<string | number | boolean, number | boolean | null>;
type res4 = myType10<string | number | boolean, number | boolean | null>;

// NonNullable

type myType11<T> = {
  [P in keyof T]: P extends undefined | null ? never : T;
};

type res5 = NonNullable<keyof any>;
type res6 = myType11<keyof any>;

// ReturnType
// 获取函数返回值类型

type res7 = ReturnType<() => number>;

//
class person1 {
  constructor(public name: string, public age: name) {
    this.age = age;
    this.name = name;
  }
}

type res8 = ConstructorParameters<typeof person1>;
type res9 = typeof person1;

// 获取函数参数元组

function say(name: string, age: number) {}
type res10 = Parameters<typeof say>;

type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer p
) => any
  ? p
  : never;

// infer关键字 可以再条件类型中定义新的类型

type myType12<T> = T extends Array<infer U> ? U : T;

// unknown 类型

// 任何类型都可以赋值给unknown

```



```typescript
export {};
// 装饰器

// 普通装饰器
function test(target: any) {
  console.log(target);
}

@test
class person {}

// 装饰器工厂

function demo() {
  return (target: any) => {};
}

@demo()
class person1 {}

// 有多个装饰器的话 从下到上执行装饰器

// 普通装饰器和装饰器工厂一起用的话先从上到下获取所有的工厂 然后在从下向上执行所有的装饰器

/**
 * 1 类装饰器
 * 类装饰器再类声明之前绑定
 * 类装饰器可以用来监视， 修改 替换类定义
 * 在执行类装饰器的时候 会吧绑定的类作为唯一的参数传递给装饰器
 * 如果装饰器返回一个新的类 原来的类会被替换掉
 */

/*
function test1(target: any) {
  target.prototype.personName = 'lnj';
  target.prototype.say = () => {
    console.log('say');
  };
}
@test1
class person3 {}
interface person3 {
  say(): void;
}

let p = new person3();
p.say();
*/

function test2<T extends new (...args: any[]) => {}>(target: T) {
  return class extends target {
    name: string = '1';
  };
}

/**
 * 方法装饰器
 * 方法装饰器在运行时传入的参数有3个
 * 对于静态方法而言就是当前的类 实例方法就是当前的实例
 * 绑定方法的名称
 * 绑定方法的属性描述符
 */

function test3(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey), console.log(descriptor);
}

class person2 {
  sayName(): void {
    console.log('name');
  }

  sayAge(): void {
    console.log('age');
  }
  static sayHello() {
    console.log('hello');
  }
}

// 类混入



```

