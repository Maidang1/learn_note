###### script 的位置

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>script的位置</title>
  </head>
  <body>
    <!--
    1.scrip放在底部不会影响dom的解析和渲染
    2.script内的代码执行会等待css加载
    3.css加载会影响DOMContentLoaded加载吗？ css代码下如果没有script代码段，不会影响
  -->
    <link href=".........." />
    <h1>哈哈哈</h1>
    <script>
      console.log('DOMContentLoaded');
    </script>
  </body>
</html>
```

#### 总结

- css 加载不会阻塞 DOM 树的解析

- css 加载会阻塞 DOM 树的渲染

- css 加载会阻塞后面 js 语句的执行

![渲染过程](/img/浏览器渲染.png)

<html>
<p>从上面两个流程图我们可以看出来，浏览器渲染的流程如下：</p>
<p>HTML 解析文件，生成 DOMTree，解析 CSS 文件生成CSSOMTree </p> 
<p>将DomTree和CSSOMTree结合生成 RenderTree(渲染树)</p>
<p>根据RenderTree渲染绘制，将像素渲染到屏幕上。<p>
<p>从流程我们可以看出来 DOM 解析和 CSS 解析是两个并行的进程，所以这也解释了为什么
CSS 加载不会阻塞 DOM 的解析。</p> <p>然而，由于 Render Tree 是依赖于 DOM Tree 和 CSSOMTree 的，所以他必须等待到 CSSOM Tree 构建完成，也就是 CSS 资源加载完成(或者 CSS
资源加载失败)后，才能开始渲染。因此，CSS 加载是会阻塞 Dom 的渲染的。</p> <p>由于 js可能会操作之前的 Dom 节点和 css 样式，因此浏览器会维持 html 中 css 和 js
的顺序。因此，样式表会在后面的 js 执行前先加载执行完毕。所以 css 会阻塞后面 js
的执行。<p>
<div>
<p>补充 DOMContentLoaded 对于浏览器来说，页面加载主要有两个事件，一个是
DOMContentLoaded，另一个是 onLoad。</p>
<p>而 onLoad没什么好说的，就是等待页面的所有资源都加载完成才会触发，这些资源包括
css、js、图片视频等。</p>
<p>而DOMContentLoaded，顾名思义，就是当页面的内容解析完成后，则触发该事件。那么，正如我们上面讨论过的，css
会阻塞 Dom 渲染和 js 执行，而 js 会阻塞 Dom 解析。那么我们可以做出这样的假设
当页面只存在 css，或者 js 都在 css 前面，那么 DomContentLoaded 不需要等到 css
加载完毕。 当页面里同时存在 css 和 js，并且 js 在 css
后面的时候，DomContentLoaded 必须等到 css 和 js 都加载完毕才触发。</p>
</div>
</html>

[参考](https://www.ucloud.cn/yun/53185.html)
