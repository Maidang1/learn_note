## index.js

```javascript
/** 事务 用wrapper包装起来 */
class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers;
  }
  /** AOP 编程概念  */
  perform(anyMethod) {
    this.wrappers.forEach((wrapper) => wrapper.initialize());
    anyMethod();
    this.wrappers.forEach((wrapper) => wrapper.close());
  }
}
let batchingStrategy = {
  isBatchingStrates: false /** 标记是否是批量更新模式 */,
  dirtyComponent: [] /** 脏组件 组件的状态和UI不匹配  */,
  batchedUpdates() {
    /** 执行所有的更新操作 */
    this.dirtyComponent.forEach((component) => component.updateComonent());
  },
};
class Updater {
  constructor(component) {
    this.component = component;
    this.pendingState = [];
  }
  addState(partcialState) {
    this.pendingState.push(partcialState);
    /** 判断是不是批量更新模式 如果是批量更新 将组件放到脏组件里 做到异步更新 */
    batchingStrategy.isBatchingStrates
      ? batchingStrategy.dirtyComponent.push(this.component)
      : this.component.updateComonent();
  }
}
class Component {
  constructor(props) {
    this.props = props;
    this.$updater = new Updater(this);
  }
  createDOMFromDOMString(domString) {
    let div = document.createElement('div');
    div.innerHTML = domString;
    return div.children[0];
  }
  setState(partcialState) {
    this.$updater.addState(partcialState);
  }

  /** 组件的更新方法 合并所有的状态 然后进行统一的页面元素UI的替换 */
  updateComonent() {
    this.$updater.pendingState.forEach((partcialState) =>
      Object.assign(this.setState, partcialState)
    );
    this.$updater.pendingState.length = 0; /** 清空队列 */
    let oldElemet = this.domElement;
    let newElement = this.renderElement();
    oldElemet.parentElement.replaceChild(newElement, oldElemet);
  }

  /** 创建页面元素 */
  renderElement() {
    let htmlString = this.render();
    this.domElement = this.createDOMFromDOMString(htmlString);
    this.domElement.component = this;
    return this.domElement;
  }

  /** 组件的挂载方法  */
  mount(container) {
    container.appendChild(this.renderElement());
  }
}

let transaction = new Transaction([
  {
    initialize() {
      /** 事件开启的时候进入批量更新模式  */
      batchingStrategy.isBatchingStrates = true;
    },
    close() {
      /** 事件结束的时候关闭批量更新模式  */
      batchingStrategy.isBatchingStrates = false;
      /** 脏组件进行状态的更新 */
      batchingStrategy.batchedUpdates();
    },
  },
]);

/** 统一的事件处理 挂载到全局  */
window.trigger = function (event, mothodName) {
  /** 拿到组件的实例(事件委托) 执行绑定的方法 */
  let component = event.target.component;
  /** wrapper包装起来 处理一些相关的事件 */
  transaction.perform(component[mothodName].bind(component));
};

/** 子组件 */
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  add() {
    this.setState({ number: this.state.number + 1 });
  }

  render() {
    return `<button onclick="trigger(event, 'add')">${this.state.number}</button>`;
  }
}

```



## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="count-app"></div>
  </body>
  <script src="./index.js"></script>
  <script>
    let countApp = document.getElementById('count-app');
    let res = new Counter().render();
   	res.mount(countApp)
  </script>
</html>

```

