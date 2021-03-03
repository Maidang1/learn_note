## redux-base

```javascript
import { createStore } from 'redux';
let INC = Symbol.for('INC');
let DEC = Symbol.for('DEC');
let initialState = 0;
function reducer(state = initialState, action) {
  switch (action.type) {
    case INC:
      return state + 1;
    case DEC:
      return state - 1;
    default:
      return state;
  }
}

/**
 * redux action有要求 有个不是undefined的type类型
 */
let store = createStore(reducer);

let state = store.getState();
let countValue = document.getElementById('counter-value');
let inc = document.getElementById('inc-btn');
let dec = document.getElementById('dec-btn');
console.log(state);

function render() {
  countValue.innerHTML = store.getState();
}

render();

store.subscribe(render)

inc.addEventListener('click', function () {
  store.dispatch({ type: INC });
});

dec.addEventListener('click', function () {
  store.dispatch({ type: DEC });
});
```



## create-store.js(版本一)

```javascript
import isPlainObject from './utils/isPlainObject';
import ActionTypes from './utils/actionType';
export default function createStore(reducer, preloadedState) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function');
  }

  /*******************************/
  /** initiallize the base property  */
  let currentState = preloadedState;
  let currentReducer = reducer;
  let currentListeners = [];
  /*******************************/

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('action must be a plainObject');
    }
    if (typeof action.type === 'undefined') {
      throw new Error('action need a type property');
    }
    currentState = currentReducer(currentState, action);
    for (let i = 0; i < currentListeners.length; i++) {
      let listener = currentListeners[i];
      listener();
    }
    return action;
  }

  dispatch({ type: ActionTypes.INIT });
  function subScribe(listener) {
    currentListeners.push(listener);
    return function unsubScribe() {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  return {
    getState,
    subScribe,
    dispatch,
  };
}

```



## bindActionCreator

```javascript
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  }
  return boundActionCreators;
}

export default bindActionCreators;

```



## combineReducer

```javascript
export default function combineReducer(reducers) {
  const reducerkeys = Object.keys(reducers);

  return function (state = {}, action) {
    let nextState = {};
    for (let i = 0; i < reducerkeys.length; i++) {
      const key = reducerkeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForkey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForkey;
    }

    return nextState;
  };
}

```



## util

```javascript

export default function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj;
  while (Object.getPrototypeOf(proto)) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

```



## applyMiddleWare

```java
function applyMiddleWare(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore();
      let dispath = () => {
        throw new Error();
      };
      let middlewareAPI = {
        getStore: store.getState,
        dispatch: (...args) => dispath(...args),
      };
      // middleware = middleware(store);
      // dispath = middleware(store.dispatch);

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispath = componse(...chain)(store.dispatch)
      return {
        ...store,
        dispath,
      };
    };
  };
}
```



## compose

```javascript
function compose(...funcs) {
  if (funcs.length === 0) {
    return (args) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export default compose;

```





## react-reudx

### index.js

```javascript
import Provider from './Provider';
import connect from './connect';

export { Provider, connect };

```



### Provider.js

```javascript
import React, { Component } from 'react';
import ReduxContext from './context';

class Provider extends Component {
  render() {
    return (
      <ReduxContext.Provider value={this.props.store}>
        {this.props.children}
      </ReduxContext.Provider>
    );
  }
}

export default Provider;

```



### connect.js

```javascript
import React from 'react';
import ReduxContext from './context';
import bindActionCreator from '../redux/bindActionCreator';
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return class extends React.Component {
      static contextType = ReduxContext;
      constructor(props, context) {
        super(props);
        /** context = {store: this.props.store} */
        this.state = mapDispatchToProps(context.store.getState());
      }
      componentDidCatch() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        let action = bindActionCreator(
          mapDispatchToProps,
          this.context.store.dispatch
        );
        return <WrappedComponent {...this.state} {...action} />;
      }
    };
  };
}

```



### context.js

```javascript
import React from 'react';

const ReduxContext = React.createContext(null);
export default ReduxContext;

```



## redux-promise

```javascript
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}
export default function ({ dispatch, getState }) {
  return (next) => (action) => {
    return isPromise(action.payload)
      ? action.payload.then((result) => {
          dispatch({ ...action, payload: result });
        })
      : next(action);
  };
}

```



## reudx-thunk

```java
function createThunkMiddleware() {
  return ({ dispatch, getState } /** middlewareAPI */) => (next) => (
    action
  ) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

```

