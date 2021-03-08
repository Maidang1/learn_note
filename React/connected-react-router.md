# connected-react-router

## index.js

```javascript
import routerMiddlware from './routerMiddlware';
import connectRouter from './connectRouter';
import push from './push';
import ConnectedRouter from './ConnectedRouter';
export { routerMiddlware, connectRouter, push, ConnectedRouter };
```

## constants

```javascript
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
```

## ConnectedRouter.js

```javascript
import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import { Route } from 'react-router';
import { LOCATION_CHANGE } from './constants';
class ConnectedRouter extends Component {
  static contextType = ReactReduxContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // location 新的路径
    // action 新的动作 POP PUSH
    this.unlistener = this.props.history.listen((location, action) => {
      this.context.store.dispatch({
        type: LOCATION_CHANGE,
        payload: { location, action },
      });
    });
  }
  componentWillUnmount() {
    this.unlistener();
  }
  render() {
    let { history, children } = this.props;
    return <Route history={history}>{children}</Route>;
  }
}

export default ConnectedRouter;
```

## connectRouter.js

```javascript
import { LOCATION_CHANGE } from './constants';
// eslint-disable-next-line import/no-anonymous-default-export
export default function (history) {
  let initialState = { action: history.action, location: history.location };
  return function (state = initialState, action) {
    switch (action.type) {
      case LOCATION_CHANGE:
        return action.payload;
      default:
        return state;
    }
  };
}
```

## push

```javascript
import { CALL_HISTORY_METHOD } from './constants';
function push(path) {
  return {
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      path,
    },
  };
}

export default push;
```

## routerMiddleware.js

```javascript
import { CALL_HISTORY_METHOD } from './constants';
// eslint-disable-next-line import/no-anonymous-default-export
export default function (history) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (action.type === CALL_HISTORY_METHOD) {
      let { method, path } = action.payload;
      history[method](path);
    } else {
      next();
    }
  };
}
```
