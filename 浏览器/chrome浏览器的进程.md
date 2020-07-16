> 打开了一个谷歌浏览器的界面，就会有4个进程，这是为什么呢？

###### 进程VS线程

`进程`: 一个进程就是一个程序的运行实例，启动程序的时候，操作系统就会为程序创建一块内存，用来存放程序， 运行数据，执行一个任务额主线程。这样的环境就是一个进程。

`线程`：线程依赖于进程，由进程启动和管理，一个进程有好多的进程


![进程和线程](/img/线程.png)

进程和线程有如下的关系：
+ 进程中的任何一个线程出现了问题，进程就会崩溃
+ `线程`之间可以共享`进程`中的数据
+ 进程关闭后，内存会被回收 (即使线程中出现了内存泄漏，内存也会正确的回收)
+ `进程`之间的内存是`相互隔离`的 (保证了数据的独立性)


###### 单进程的浏览器时代
> 单进程的浏览器就是网络，插件，javascript运行环境，渲染引擎，页面，这些所有的模块都运行在同一个进程中

###### 缺点
+ 不稳定
  早期的浏览器有的功能需要`插件`来实现，如果插件出现了问题，就会引起浏览器的崩溃
+ 不流畅
  所有的模块都是运行在同一个进程中，如果javascript脚本出现了死循环，执行的时候，就会占有整个进程，导致其他的模块
  没有机会执行，这样的话浏览器就会卡顿，失去了响应。同时，页面的内存泄漏也会导致浏览器变得卡顿。
+ 不安全
  由于所有的模块都是运行在同一个进程中，如果插件用了C/C++模块编写，就有可能通过这个进程访问到你电脑上的其他数据

###### 多进程的浏览器
![](/img/chrome架构.png)
现在拥有了多进程
+ 不稳定： 进程之间是相互隔离的，一个进程崩溃了，不会影响其他的进程
+ 不流畅 javascript是运行在渲染进程中的，即使阻塞了渲染，只是影响到了当前的界面。（每个界面都有自己的渲染进程）
+ 采用多进程的话可以使用`安全沙箱`,沙箱就是给操作系统加上了一把锁，运行在沙箱里面的程序不可以访问外部的数据


+ 目前的架构
![](/img/chrome_lastest架构.png)

+ 浏览器进程(Browser Process)：负责界面展示，用户交互，子进程管理，存储服务
+ 渲染进程(Render Process )：将HTML，CSS，Javascript转换成网页，排版引擎和V8运行在在其中，处于安全考虑，运行在沙箱中
+ GPU进程(GPU Process)： chrome UI 界面的绘制
+ 网络进程(Internet Process): 负责网络的加载
+ 插件进程(Plugin Process)：负责插件的运行

首先我们浏览一个网页的时候，我们就会在导航栏里输入一个URL, Browser Process向这个URL发送请求获取HTML内容，返回后送给Render Process。遇到网络资源，Internet Process 加载然后返回给Browser加载，同时通知Browser Process。需要Plugin Process的 执行插件的代码。解析完成后，Render Process交给GPU Process。转化成图像


###### 浏览器的进程模式

Process-per-site-instance(default) -同一个site-instance使用一个进程
Process-per-site - 同一个site使用一个进程
Process-per-tab - 每个tab使用一个进程
Single Process - 所有的tab使用一个进程

+ site 相同而注册域名
+ site-instace 是一组 connected（can obtain references to each other in script code） pages from the same site 例如 <a target="_blank"> js打开新的界面
+ Process-per-site，当你打开 a.baidu.com 页面，在打开 b.baidu.com 的页面，这两个页面的tab使用的是共一个进程，因为这两个页面的site相同，而如此一来，如果其中一个tab崩溃了，而另一个tab也会崩溃。

+ Process-per-site-instance 是最重要的，因为这个是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 a.baidu.com ，然后再打开一个 tab 访问 b.baidu.com，这两个 tab 会使用两个进程。而如果你在 a.baidu.com 中，通过JS代码打开了 b.baidu.com 页面，这两个 tab 会使用同一个进程。

###### 为啥使用Process-per-site-instance

+ 相比于 Process-per-tab，能够少开很多进程，就意味着更少的内存占用
+ Process-per-site，能够更好的隔离相同域名下毫无关联的 tab，更加安全
