# react-ssr

## webpack.base.js

```javascript
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};

```



## webpack.client.js

```javascript
const path = require('path');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');

module.exports = merge(base, {
  target: 'node',
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'client.js',
  },
});

```



## webpack.server.js

```javascript
const path = require('path');
const nodeExternal = require('webpack-node-externals');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');

module.exports = merge(base, {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  externals: [nodeExternal()],
});

```



## package.json

```json
 "scripts": {
    "dev:build:server": "webpack --config webpack.server.js --watch",
    "dev:build:client": "webpack --config webpack.client.js --watch",
    "dev:start": "nodemon build/server.js",
    "dev": "npm-run-all --parallel dev:**"
  },
```



## src/client/index.js

```javascript
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import routers from '../router';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import { getClientStore } from '../store';

// hydrate 表示做的是服务端渲染没有完成的事情， 例如绑定事件
ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {routers.map((route) => (
            <Route {...route} />
          ))}
        </div>
      </Fragment>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

```



## src/components/Header/index.js

```javascript
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand">SSR</a>
        </div>
        <div>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/counter">计数器</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

```



## src/container/counter/index.js

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/counter';
class Counter extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button
          onClick={() => {
            this.props.increment();
          }}
        >
          +
        </button>
      </div>
    );
  }
}

export default connect((state) => state.counter, actions)(Counter);

```



## src/container/home/index.js

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/home';

class Home extends Component {
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.getHomeList();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul className="list-group">
            {this.props.list.map((item) => {
              return (
                <li key={item.id} className="list-group-item">
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

// 用来加载数据
Home.loadData = function (store) {
  return store.dispatch(actions.getHomeList());
};

export default connect((state) => state.home, actions)(Home);

```



## server/index.js

```javascript
import express from 'express';
import { resolve } from 'path';
import render from './render';

const app = express();
app.use(express.static(resolve('public')));
app.get('*', function (req, res) {
  render(req, res);
});

app.listen(3000);

```



## server/render.js

```javascript
import routers from '../router';
import { Route, StaticRouter, matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Header from '../components/Header';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { getServerStore } from '../store';

export default function (req, res) {
  let store = getServerStore();
  // 获取要渲染的组件
  let matchRouter = routers.filter((route) => matchPath(req.path, route));

  let promises = [];
  matchRouter.forEach((route) => {
    if (route.loadData) {
      promises.push(route.loadData(store));
    }
  });

  Promise.all(promises).then(function () {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path}>
          <Fragment>
            <Header />
            <div className="container" style={{ marginTop: 70 }}>
              {routers.map((route) => (
                <Route {...route} />
              ))}
            </div>
          </Fragment>
        </StaticRouter>
      </Provider>
    );
    res.send(
      `
      <html>
        <head>
          <title>ssr</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.context = {
              state:${JSON.stringify(store.getState())}
            }
          </script>
          <script src='/client.js'></script>
        </body>
      </html>
      `
    );
  });
}

```



## store/action/counter.js

```javascript
import * as types from '../action-type';
export default {
  increment() {
    return {
      type: types.INCREMENT,
    };
  },
};

```



## store/reducers/counter.js

```javascript
import * as types from '../action-type';
let initState = { number: 0 };

export default function (state = initState, action) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        number: state.number + 1,
      };
    default:
      return state;
  }
}

```



## store/reducers/index.js

```javascript
import { combineReducers } from 'redux'
import counter from './counter';


let reducers = combineReducers({
  counter
})

export default reducers
```



## store/action-type.js

```javascript
export const INCREMENT = 'INCREMENT';
export const SET_LIST = 'SET_LIST'
```



## store/index.js

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

export function getClientStore() {
  let initState = window.context.state;
  return createStore(reducers, initState, applyMiddleware(thunk, logger));
}

export function getServerStore() {
  return createStore(reducers, applyMiddleware(thunk, logger));
}

```



## src/router.js

```javascript
import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from './container/home';
import Counter from './container/counter';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    key: '/',
    loadData: Home.loadData, // 加载异步数据
  },
  {
    path: '/counter',
    component: Counter,
    key: '/counter',
  },
];

// export default (
//   <Fragment>
//     <Route path="/" exact component={Home} />
//     <Route path="/counter" exact component={Counter} />
//   </Fragment>
// );

```



## api/server.js

```javascript
let express = require('express');
let cors = require('cors');
let app = express();
let users = [
  { id: 1, name: 'zhangsan' },
  { id: 2, name: 'lisi' },
];

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.get('/api/users', function (req, res) {
  res.json(users);
});

app.listen(4000);

```

