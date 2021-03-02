## 生命周期(老版)

![5287253-315eac1c26082f08](../img/5287253-315eac1c26082f08.webp)

```javascript
import React, { Component } from 'react';

class LifeCycle extends Component {
  /**组件的静态属性 */
  static defaultProps = { name: '计数器' };
  constructor(props) {
    /** setup props and state */
    super(props);
    this.state = { number: 0 };
    console.log('setup');
  }
  componentWillMount() {
    console.log('2 组件将要挂载');
  }
  componentDidMount() {
    console.log('4.组件挂载完成');
  }
  shouldComponentUpdate() {
    console.log('5. 询问组件是否要更新');
    return true;
  }
  componentWillUpdate() {
    console.log('6 组件将要更新');
  }
  componentDidUpdate() {
    console.log('7 组件已经更新完毕');
  }
  add = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    console.log('parent render');
    return (
      <div>
        <p>{this.state.name}</p>
        <button onClick={this.add}>+</button>
        <Sub />
      </div>
    );
  }
}

export default LifeCycle;

class Sub extends Component {
  constructor(props) {
    super(props);
    this.state = { age: 10 };
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  render() {
    console.log('children render');
    return (
      <div>
        <p>age:{this.state.age}</p>
        <button
          onClick={() => {
            this.setState({ age: this.state.age + 1 });
          }}
        ></button>
      </div>
    );
  }
}

```



## 生命周期新版

![5287253-19b835e6e7802233](../img/5287253-19b835e6e7802233.webp)



### getDerivedStateFromProps

```javascript
import React, { Component } from 'react';
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  add = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.add}>+</button>
        <SubCounter number={this.state.number} />
      </div>
    );
  }
}

class SubCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  /** 将State和Props传来的值全部整合到state上 */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.number % 2 === 0) {
      return { number: nextProps.number * 2 };
    } else {
      return { number: nextProps.number * 3 };
    }
  }
  render() {
    return <div>{this.state.number}</div>;
  }
}

export default Counter;

```



## getSnapshotBeforeUpdate

```javascript
import React, { Component } from 'react';
class getSnapshotBeforeUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = { message: ['5', '4', '3', '2', '1'] };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        message: [this.state.message.length, ...this.state.message],
      });
    }, 1000);
  }

  getSnapshotBeforeUpdate() {
    return this.wrapper.current.scrollHeight;
  }
  componentDidUpdate(prevProps, prevState, scrollHeight) {
    let Dom = this.wrapper.current;
    Dom.scrollTop = Dom.scrollTop + (Dom.scrollHeight - scrollHeight);
  }
  render() {
    let style = {
      height: '100p',
      width: '200px',
      border: '1px solid red',
      overflow: 'auto',
    };
    return (
      <div style={style} ref={this.wrapper}>
        <ul>
          {this.state.message.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default getSnapshotBeforeUpdateComponent;

```



## context(上下文)

### 旧版

```javascript
import React, { Component } from 'react';
import propTypes from 'prop-types';
class Page extends Component {
  static childContextTypes = {
    color: propTypes.string,
    setColor: propTypes.func,
  };
  getChildContext() {
    return { color: 'gray', setColor: this.setColor };
  }

  setColor = (color) => {
    this.setColor({ color });
  };
  constructor() {
    super();
    this.state = { color: 'gray' };
  }
  render() {
    return (
      <>
        <Header>
          <Title></Title>
        </Header>
        <Main>
          <Content></Content>
        </Main>
      </>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        Header
        <Title></Title>
      </div>
    );
  }
}

class Title extends Component {
  /** 子集关系 */
  static contextTypes = {
    color: propTypes.string,
    setColor: propTypes.func,
  };
  /**
   * this.context.color
   * this.context.setColor
   */

  render() {
    return <div>Title</div>;
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        Main
        <Content></Content>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return <div>Content</div>;
  }
}

export default Page;

```



### 新版

```javascript
// import { func } from 'prop-types';
import React, { Component } from 'react';
// import propTypes from 'prop-types';
const ThemeContext = React.createContext();
/**
 * ThemeContext = {Provider Consumer}
 *
 */

/**-------- createContext -----------------------------------*/

function createContext() {
  class Provider extends Component {
    static value;
    constructor(props) {
      super(props);
      Provider.value = props.value;
    }
    render() {
      return this.props.children;
    }
  }

  class Consumer extends Component {
    render() {
      return this.props.children(Provider.value);
    }
  }

  return { Provider, Consumer };
}

/**----------------------------------------------------------- */

class Page extends Component {
  constructor() {
    super();
    this.state = { color: 'gray' };
  }
  setColor(color) {
    this.setState({ color });
  }
  render() {
    let ctx = { color: 'gray', setColor: this.setColor };
    return (
      <ThemeContext.Provider value={ctx}>
        <Header>
          <Title></Title>
        </Header>
        <Main>
          <Content></Content>
        </Main>
      </ThemeContext.Provider>
    );
  }
}

class Header extends Component {
  /**----------------------------------------------- */
  static contextType = ThemeContext;
  /**----------------------------------------------- */

  /**
   * this.context 拿到了所有的值
   */
  render() {
    return (
      <div>
        Header
        <Title></Title>
      </div>
    );
  }
}

function Title(props) {
  return <div>title</div>;
}

class Main extends Component {
  render() {
    return (
      <div>
        Main
        <Content></Content>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return <div>Content</div>;
  }
}

export default Page;

```

