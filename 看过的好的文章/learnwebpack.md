# webpack

> 会根据依赖的关系自动加载里面的依赖，会自动生成关系依赖图

# webpack 基础知识

## 监听文件的变化

+ 启动时  webpack --watch

> ### 文件监听的原理分析 ：
>
> 轮训的判断最后的修改时间是否会变化 如果文件发生了变化 并不会立即通知，而是先缓存起来，等待aggregateTimeout

```javascript
module.export = {
  watch:true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout:300ms,
    // 每秒询问的次数
    poll: 100
  }
}
```



## webpack-dev-server



```javascript
"script": {
  "dev": "webpack-dev-server --open"
}

// webpack.config.js

plugins: [
  new webpack.HotModuleRelacementPlugin({})
]

devServer: {
  contentBase:'/dist',
  hot: true
}

```



> WDS 不断刷新浏览器
>
> WDS 不输出文件 放在内存中
>
> 使用HotModuleRreplacementPlugin插件

```javascript
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const app = express();
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, function() {
  console.log("port at 3000")
})

```



![image-20210105220217624](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105220217624.png)



## 文件指纹

![image-20210105220846042](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105220846042.png)



> 还有压缩CSS, HTML, JavaScript 自动清理构建产物



# webpack 进阶知识

## css代码补全

+ postcss-loader
+ autoprefixer

## px to rem

+ px2rem-loader
+ lib-flexible

## 资源内联

![image-20210105223227371](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105223227371.png)

![image-20210105223345589](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105223345589.png)

## 多页面打包

+ glob.sync

## source map



## 提取公共模块

![image-20210105230544445](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105230544445.png)



## tree shaking

+ es6 语法

## ScopeHoisting

+ 出现大量的闭包
+ 内存开销大

![image-20210105231948352](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105231948352.png)



原理：将所有的模块按照引用的顺序放在一个函数的作用于里，然后释放度重命名 防止变量冲突



## 代码分割

![image-20210105232450373](https://cdn.jsdelivr.net/gh/Diamond-Au/image/image/image-20210105232450373.png)



懒加载js脚本

commonJS: require.ensure

ES6 动态 import 

使用

```bash
npm i @babel/plugin-syntax-dynamic-import --save-dev
```

.babelrc

```javascript
"plugins":["@babel/plugin-syntax-dynamic-import"]
```

index.js

```javascript
import React from 'react'
....

function handleClick() {
  import('./xxx').then(res => {
    // TODO
  })
}
```



## ESLint + webpack

+ Airbnb eslint-config-airbnb



```javascript
husky
```

eslint.js

```javascript
module.exports = {
  "parser":"babel-eslint",
  "extends":"airbnb",
  "rules": {
    // TODO
  }
  "env": {
  	// TODO
	}
}
```





