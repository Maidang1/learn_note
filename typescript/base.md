# ts基础知识

## 基础类型

```typescript
// number
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24

// string
let name: string = 'bob'
name = 'smith'
let name2:string = 'yess'
let sentenc = `hello my name is ${name2}`

// Array
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3]

// tuple length && typp
let x:[string, number] = ["1", 1]



enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green


// any
let notSure: any = 4;
noSure = 'string'
noSure = false


// never

function error(message: string): never {
  throw Error(message);
}


// 类型推断

var strLen: number = (<string>someValue).length;
var strLen: number = (someValue as string).length;
```



## 变量声明

```typescript
/******************************************************* var 声明 *************************************************************/
function f() {
  var a = 10;
  return function g() {
    var b = a + 1;
    return b;
  };
}

var g = f();
console.log(g())



function f(shouldInitialize) {
  if (shouldInitialize) {
    var x = 10
  }

  return x
}

f(true)  // returns '10'
f(false) // returns 'undefined'



function sumMatrix(matrix) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  
  return sum
}
// 内层的I会覆盖外面的I 作用域有问题


for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}

/******************************************************* let 声明 *************************************************************/

a++; // error
let a = 1;

/******************************************************* const 声明 *************************************************************/

const kitty = {
    name: 'kitty'
    numLives: 9
}
// 引用类型
```



## interface

```typescript
function printLabel(o: { label: string }) {
  console.log(o.label);
}

let myObj = { size: 10, label: 'Ob' };

printLabel(myObj); // ok

// 存在属性 并且类型正确即可
interface LabeledValue {
  label: string;
}
function printLabel(o: LabeledValue) {
  console.log(o.label);
}

let myObj = { size: 10, label: 'Ob' };

printLabel(myObj);


// 可选属性
interface Square {
  color: string;
  area: number;
}

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

// 只读属性
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error

// 额外属性检查
interface Square {
  color: string;
  area: number;
}

interface SquareConfig {
  color?: string;
  width?: number;
  // 额外的属性
  [propName: string]: any;
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

```



## 函数类型

```typescript
interface SeachFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SeachFunc;

mySearch = function (souce: string, subString: string): boolean {
  let res = souce.search(subString);
  return res > 1;
};

```



## 可索引的类型

```typescript
interface StringArray {
  readonly [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];
let myStr: string = myArray[0];


class Animal {
  name: string = 'zhangsan';
}
class Dog extends Animal {
  bread: string = '1';
}

interface NotOkey {
    // not ok
  [x: number]: Animal;
  [x: string]: Dog;
}


class Animal {
  name: string = 'zhangsan';
}
class Dog extends Animal {
  bread: string = '1';
}

interface NotOkey {
    // ok
  [x: number]: Dog;
  [x: string]: Animal;
}


```

## 类实现接口

```typescript
// 类的实例接口
interface ClockInterface {
  trick(): void;
}

// 类的静态接口
interface ClockConstructor {
  // 构造函数签名
  new (hour: number, minute: number): ClockInterface;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}

  trick() {
    console.log('beep beep');
  }
}

class AnlogClocl implements ClockInterface {
  constructor(h: number, m: number) {}
  trick() {
    console.log('tick');
  }
}

let digital = createClock(DigitalClock, 12, 17);
let anlog = createClock(AnlogClocl, 12, 17);

```

## 接口继承接口

```typescript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 10;

```

## 混合类型

```typescript
// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};

  return counter;
}

```



## 接口继承类

```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 接口继承了类的一些东西 然后需要继承这个类才可以实现这个接口
class ImageC implements SelectableControl {
  select() {}
}

```

## 类

```javascript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distance: number = 0) {
    console.log(`${this.name} move ${distance}`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  bark() {
    console.log('woof');
  }

  move(distance: number = 5) {
    console.log('Slithering........');
    super.move(distance);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distance: number = 10) {
    console.log('Galloping');
    super.move(distance);
  }
}

```

## private

```typescript
class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  /**
   * move
   */
  public move(distance: number) {
    console.log(`${this.name} move %=${distance}`);
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino');
  }
}

class Employee {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distance: string) {
    console.log(distance);
  }
}

let aninal = new Animal('r');
let rhino = new Rhino();
let em = new Employee('e');

aninal = rhino;
aninal = em; // error

```

## protected

```typescript
class Person {
  protected name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  getName() {
    return `hello my name is ${this.name}`;
  }
}
```



## readonly

```typescript
class Person {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 简写

class Person {
  constructor(readonly name: string) {}
}

```

## 存取器

```typescript
class Employee {
  private _fullName: string;
  constructor() {
    this._fullName = '';
  }
  get fullName(): string {
    return this._fullName;
  }
  set fullName(fullName: string) {
    this._fullName = fullName;
  }
}

let employee = new Employee();
employee.fullName = 'bob smith';
console.log(employee);

```

## 静态属性

```typescript
class Grid {
  static origin = { x: 0, y: 0 };
  scale: number;
  constructor(scale: number) {
    this.scale = scale;
  }

  calculateDistanceFormOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
  }
}
```



## 抽象类

```typescript
abstract class Department {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName(): void {
    console.log('Department name' + this.name);
  }
  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
  constructor(name: string) {
    super(name);
  }
  printMeeting() {
    console.log('10AM meeting');
  }
  otherName() {
    console.log('other name');
  }
}

let departmen:Department;
departmen = new AccountingDepartment('1');
departmen.getName();
departmen.printMeeting();

```



## typeof

```typescript
class greeting {
  static initialValue = 'hello there';
  constructor(public name: string) {
    this.name = name;
  }
  greet() {
    if (this.name) {
      return '1';
    } else {
      return greeting.initialValue;
    }
  }
}




let greetMaker: typeof greeting = greeting;

greetMaker.initialValue = 'hey there';


class test1 {
  getName() {
    console.log('name');
  }
  getAge() {
    console.log('age');
  }
}

let test2: typeof test1 = test1;
test2.prototype.getAge = function () {
  console.log('haha');
};

var res = new test2();
res.getAge();


```



## 泛型

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 接口泛型
interface GenricIdentifyFn<T> {
  (arg: T): T;
}

let myIdentify: GenricIdentifyFn<number> = identity;

// 类泛型
class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}

let myFnn = new GenericNumber<number>();
myFnn.add(1, 2);


// 泛型约束
interface LengthWise {
  length: number;
}
function loggingIdentify<T extends LengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function create<T>(C: { new (): T }): T {
  return new C();
}
```

## 高级类型

```typescript
/**
 * 类型谓词
 */

interface Fish {
  swing(): any;
  layEggs(): any;
}

interface Bird {
  fly(): any;
  layEggs(): any;
}

function getSmallPet(): Fish | Bird {}

let pet = getSmallPet();
if (isFish(pet)) {
  pet.swing();
} else {
  pet.fly();
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swing !== undefined;
}



function isString(x: any): x is string {
  return typeof x === 'string';
}
```

