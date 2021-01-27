## webpack构建 SPA 应用

##### 基本配置

```javascript
{
	"script": {
		"dev" : "npx webpack --mode development",
         "prod" : "npx webpack --mode production"
    }
}
// tree shaking production自动开启 但是分析不到scope里面的内容 只能分析导入导出的时候
```

##### webpack.config.js

```javascript
// css tree shaking purifycss-webpack mini-css-extract-plugin
// js tree shaking webpack-deep-scope-plugin


// yargs-parser
```

