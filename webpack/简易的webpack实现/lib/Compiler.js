let path = require('path');
let fs = require('fs');
let babylon = require('babylon');
let t = require('@babel/types');
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let ejs = require('ejs');
let { SyncHook } = require('tapable');

/**
 * babylon 源码转换成 AST
 * @babel/traverse
 * @babel/types
 * @babel/generator
 */
class Compiler {
  constructor(config) {
    this.config = config;
    /** 需要保存入口模块的路径 */
    this.entryID = null;
    /** 需要保存模块的依赖 */
    this.modules = {};
    this.entry = config.entry;
    /** 工作路径 */
    this.root = process.cwd();

    /** 声明周期钩子 */
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };

    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }

  _getSource(modulePath) {
    let rules = this.config.module.rules;
    let content = fs.readFileSync(modulePath, 'utf8');
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) {
        function normalLoader() {
          let loader = require(use[len--]);
          content = loader(content);
          if (len >= 0) {
            normalLoader();
          }
        }
        normalLoader();
      }
    }
    return content;
  }
  /**
   *
   * @param {string} source 源代码
   * @param {string} parentPath 需要拼接的路径名
   * @description 转义源代码
   */
  _parse(source, parentPath) {
    /** 存放依赖的数组 */
    let dependencies = [];
    let ast = babylon.parse(source);
    traverse(ast, {
      CallExpression(p) {
        /** 对应的节点 */
        let node = p.node;
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
          /** 对应引用的资源 */
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          moduleName = './' + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
  }

  /**
   *
   * @param {String} path 打包文件的路径
   * @param {Boolean} isEntry 是不是入口文件
   * @description 构建依赖关系
   */
  _buildModule(modulePath, isEntry) {
    let source = this._getSource(modulePath);
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryID = moduleName;
    }
    /**  改造source源码 返回一个依赖配置 */
    let { sourceCode, dependencies } = this._parse(
      source,
      path.dirname(moduleName)
    );
    this.modules[moduleName] = sourceCode;
    dependencies.forEach((dep) => {
      this._buildModule(path.join(this.root, dep), false);
    });
  }

  /***
   * @description 转义好的文件输出出去
   */
  _emitFile() {
    /** 输出的文件名 */
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this._getSource(path.join(__dirname, './main.ejs'));
    let code = ejs.render(templateStr, {
      entryId: this.entryID,
      modules: this.modules,
    });
    this.assets = {};
    this.assets[main] = code;

    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    this.hooks.run.call();
    this.hooks.compile.call();
    this._buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    this._emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}

module.exports = Compiler;
