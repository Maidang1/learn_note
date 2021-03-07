# react-router-dom



## BrowserRouter

```javascript
import React, { Component } from 'react';
import Context from './context';

let pushState = window.history.pushState;

class HashRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { pathname: window.location.pathname, state: null },
    };
  }
  componentDidMount() {
    window.history.pushState = (state, title, url) => {
      pushState.call(window.history, state, title, url);
      window.onpushstate.call(this, state, url);
    };
    window.onpopstate = (event) => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.pathname,
          state: event.state,
        },
      });
    };
    window.onpushstate = (state, pathname) => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: pathname,
          state: state,
        },
      });
    };
  }
  render() {
    let that = this;
    let value = {
      location: that.state.location,
      history: {
        push(to) {
          /** 阻止跳转 */
          if (that.block) {
            let confirm = window.confirm(
              that.block(typeof to === 'object' ? to : { pathname: to })
            );
            if (!confirm) return;
          }
          if (typeof to === 'object') {
            let { pathname, state } = to;
            window.history.pushState(state, '', pathname);
          } else {
            window.history.pushState(null, '', to);
          }
        },
        block(message) {
          that.block = message;
        },
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export default HashRouter;

```



## context

```javascript
/** 暴露出整个库的context上下文  */
import React from 'react';

const Context = React.createContext();

export default Context;

```



## HashRouter

```javascript
import React, { Component } from 'react';
import Context from './context';
class HashRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { pathname: window.location.hash.slice(1), state: null },
    };
    this.locationState = null;
  }
  componentDidMount() {
    window.location.hash = window.location.hash || '/';
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1),
          state: this.locationState,
        },
      });
    });
  }
  render() {
    let that = this;
    let value = {
      location: that.state.location,
      history: {
        push(to) {
          /** 阻止跳转 */
          if (that.block) {
            let confirm = window.confirm(
              that.block(typeof to === 'object' ? to : { pathname: to })
            );
            if (!confirm) return;
          }
          if (typeof to === 'object') {
            let { pathname, state } = to;
            that.locationState = state;
            window.location.hash = pathname;
          } else {
            that.locationState = null;
            window.location.hash = to;
          }
        },
        block(message) {
          that.block = message;
        },
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export default HashRouter;

```



## Link

```javascript
import React, { Component } from 'react';
import Context from './context';
class Link extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /** 注意合并上部传来的props */
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        {...this.props}
        onClick={() => {
          this.props.context.history.push(this.props.to);
        }}
      >
        {this.props.children}
      </a>
    );
  }
}

export default Link;

/**
 * <a href={`#${this.props.to}`}>{this.props.children}</a>;
 */

```



## MenuLink

```javascript
import React, { Component } from 'react';
import Route from './Route';
import Link from './Link';
/**自定义导航 正增加高亮属性 */

/** Route渲染内容有三种方法 component render children */
// component render 路径匹配渲染
// children 都会渲染
function MenuLink({ to, exact, children }) {
  return (
    <Route
      path={to}
      exact={exact}
      children={(props) => (
        <li className={props.match ? 'active' : ''}>
          <Link to={to}>{children}</Link>
        </li>
      )}
    ></Route>
  );
}

export default MenuLink;

```



## Prompt

```javascript
import React, { Component } from 'react';
import Context from './context';
class Prompt extends Component {
  static contextType = Context;

  componentWillUnmount() {
    this.history.block(null);
  }
  render() {
    let history = this.context.history;
    const { when, messaga } = this.props;
    if (when) {
      history.block(messaga);
    } else {
      history.block(null);
    }

    return null;
  }
}

export default Prompt;

```



## Redirect

```javascript
import { Component } from 'react';
import Context from './context';
class Redirect extends Component {
  static contextType = Context;
  render() {
    this.context.history.push(this.props.to);
    return null;
  }
}

export default Redirect;

```



## Route

```javascript
import PathToRegexp from 'path-to-regexp';
import React, { Component } from 'react';
import Context from './context';
class Route extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { pathname } = this.context.location;
    let {
      path = '/',
      component: Component,
      exact = false,
      render,
      children,
    } = this.props;
    let paramNames = [];
    let regxp = PathToRegexp(path, paramNames, { end: exact });
    let result = pathname.match(regxp);
    let props = {
      location: this.context.location,
      history: this.props.history,
    };
    if (result) {
      paramNames = paramNames.map((item) => item.name);
      let [url, ...values] = result;
      let params = {};
      for (let i = 0; i < paramNames.length; i++) {
        params[paramNames[i]] = values[i];
      }
      props.match = { params, path, url, isExect: url === pathname };
      if (Component) {
        return <Component {...props} />;
      } else if (render) {
        /** 检查属性 兼容性 */
        return render(props);
      } else if (children) {
        return children(props);
      } else {
        return null;
      }
    } else {
      if (children) return children(props);
      else return null;
    }
  }
}

export default Route;

```



## Switch

```javascript
import { Component } from 'react';
import PathToRegexp from 'path-to-regexp';
class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { pathname } = this.context.location;
    let children = Array.isArray(this.props.children)
      ? this.props
      : [this.props.children];
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let { path = '/', exect = false } = child.props;
      let pathNames = [];
      let reg = PathToRegexp(path, pathNames, { end: exect });
      let result = pathname.match(reg);
      if (result) {
        return child; /** react的元素 React.createElement */
      }
    }
    return null;
  }
}

export default Switch;

```



## WithRouter

```javascript
import React from 'react';
import Route from './Route';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (WrappedComponent) {
  return (props) => <Route component={WrappedComponent} />;
}

```

