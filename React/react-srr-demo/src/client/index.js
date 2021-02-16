import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import routers from '../router';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import { getClientStore } from '../store';

import { renderRoutes, matchRoutes } from 'react-router-config';


// hydrate 表示做的是服务端渲染没有完成的事情， 例如绑定事件
ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {renderRoutes(routers)}
        </div>
      </Fragment>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
