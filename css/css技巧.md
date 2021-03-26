## 半透明的边框

```css
.container {
        border: 10px solid hsla(0, 0%, 100%, 0.5);
        background-color: white;
        background-clip: padding-box;
      }
```



## 布局

**水平垂直居中**

> 核心点在于使用了 FFC/GFC 使 margin: auto 在垂直方向上居中元素

```html
<div class="g-container">
    <div class="g-box">
    </div>
</div>
```

```css
.g-container {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.g-box {
    width:40vmin;
    height: 40vmin;
    background: #000;
    margin: auto;
}
```



**双飞翼布局**

> - 双飞翼布局的关键点 margin-left 取值为百分比时，是以其父元素的宽度为基准的

```html
<div class="g-container">
    <div class="g-middle">
        <div class="g-middle-inner">
            middle-inner
        </div>
    </div>
    <div class="g-left">
        left
    </div>
    <div class="g-right">
        right
    </div>
</div>
```



```css
.g-container {
    position: relative;
    height:100vh;
    min-width: 400px;
}
.g-container > div {
    height: 100vh;
    float: left;
    text-align: center;
    color:#fff;
    line-height:100vh;
    font-size:3vw;
}

.g-middle {
    position: relative;
    width: 100%;
    background: #cc6630;
}

.g-middle .g-middle-inner {
    margin: 0 200px;
}

.g-left {
    position: relative;
    width: 200px;
    background: #ffcc00;
    margin-left: -100%;
}
.g-right {
    position:relative;
    width:200px;
    background: pink;
    margin-left: -200px;
}
```



**flex实现圣杯布局**

> flex: flex-grow flex-grow  flex-basis
>
> [CSS](https://wiki.developer.mozilla.org/en-US/docs/Web/CSS)属性 **`flex-grow`**设置了一个flex项[主尺寸](https://www.w3.org/TR/css-flexbox/#main-size)的flex增长系数。它指定了flex容器中剩余空间的多少应该分配给项目（flex增长系数）。
>
> [主尺寸](https://www.w3.org/TR/css-flexbox/#main-size)是项的宽度或高度，这取决于[`flex-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction)值。
>
> 剩余的空间是flex容器的大小减去所有flex项的大小加起来的大小。如果所有的兄弟项目都有相同的flex-grow系数，那么所有的项目将获得相同的剩余空间，否则将根据不同的flex-grow系数定义的比例进行分配

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`flex-shrink`** 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 **`flex-basis`** 指定了 flex 元素在主轴方向上的初始大小。如果不使用  [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

**flex属性**

```css
/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```



```html
<div class="g-container">
    <div class="g-middle">
        middle
    </div>
    <div class="g-left">
        left
    </div>
    <div class="g-right">
        right
    </div>
</div>
```



```css
.g-container {
    position: relative;
    height:100vh;
    min-width:400px;
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
}
.g-container > div {
    height: 100vh;
    text-align:center;
    color:#fff;
    line-height:100vh;
    font-size: 3vw;
}

```



**圣杯布局**

```html
<div class="g-container">
    <div class="g-middle">
        <div class="g-middle-inner">
            middle-inner
        </div>
    </div>
    <div class="g-left">
        left
    </div>
    <div class="g-right">
        right
    </div>
</div>
```



```css
.g-container {
    position: relative;
    height:100vh;
    padding:0 200px;
    min-width:400px;
}
.g-container {
    height: 100vh;
    float:left;
    text-align:center;
    color:#fff;
    line-height:100vh;
    font-size:3vw;
}
.g-middle {
    position: relative;
    width:100px;
    background: #cc6630;
}
.g-left {
    position: relative;
    width:200px;
    background:#ffcc00;
    margin-left:100%;
    left:-200px;
}
.g-right {
    position: relative;
    width:200px;
    background:pink;
    margin-left:-200px;
    right:-200px;
}
```

