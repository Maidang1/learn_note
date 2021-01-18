## Singleton pattern

> Singleton pattern is aimed to make something into some group make them separate from others, 
>

> 单例设计模式就是把一类实物和属性进行分组， 存储在堆内存中， 避免相互影响和冲突
>
> 每一个命名空间都是js中object这个基类的实例， 实例和实例不干扰， 我们叫单例
>
> 这种模式的好处是可以再AA中创建很多的内容（函数或者变量） 外面需要调用什么就暴露什么

```javascript
var n = 2;
var obj = {
  n:3;
  fn:(function(n) {
    n*=2;
    this.n++;
    var n = 5;
    return function(m) {
      this.n *=2;
      console.log(m + (++n));
    }
  })(n) //obj.n 会报错
}

var fn = obj.fn;
fn();
obj.fn(3)
console.log(n, obj.n)
```



![image-20201212231938465](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20201212231938465.png)



![image-20201212232244817](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20201212232244817.png)