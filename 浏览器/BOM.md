## BOM

- Browser-Objec- Model
- 针对浏览器相关交互的方法和借口结合

## BOM 的解决问题

- 处理窗口和框架
- 提供浏览器的交互
- 解决了浏览器窗口的访问和操作

## Window 对象

- 全局对象都在 Window 对象
- 双面人 BOM 相关 作用域相关

## BOM 规范

- ECMA： ECMA-262 标准

- DOM: w3c

- BOM: 没有规范 (浏览器的功能定义不相同，兼容性不好)

## windows

```txt
                                 window
                                   |
                                   |
                                   |
              document<----DOM<-----------> BOM -------->   frames[] 框架的信息
              												history 历史记录
              												location 获取界面的信息
              												navigator 浏览器信息
              												screen 屏幕信息

```

## Window 对象

- window.open() 打开一个窗口 window.close() 做异步的 ajax 请求 websocket
