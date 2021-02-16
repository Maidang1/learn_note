import routers from '../router';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Header from '../components/Header';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { getServerStore } from '../store';
import { renderRoutes, matchRoutes } from 'react-router-config';

export default function (req, res) {
  let context = { csses: [] };
  let store = getServerStore(req);
  // 获取要渲染的组件
  // let matchRouter = routers.filter((route) => matchPath(req.path, route));
  let matchRouters = matchRoutes(routers, req.path);

  let promises = [];

  console.log(matchRouters)
  matchRouters.forEach((item) => {
    if (item.route.loadData) {``
      promises.push(
        new Promise(function (resolve) {
          return item.route.loadData(store).then(resolve, resolve);
        })
      );
    }
  });

  Promise.all(promises).then(function () {
    let html = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          <Fragment>
            <Header />
            <div className="container" style={{ marginTop: 70 }}>
              {renderRoutes(routers)}
            </div>
          </Fragment>
        </StaticRouter>
      </Provider>
    );

    let cssStr = context.csses.join('\n');
    if (context.notfound) {
      res.statusCode = 404;
    } else if (context.url) {
      res.redirect(302, context.url); // 浏览器请求的次数不一样
    }
    res.send(
      `
      <html>
        <head>
          <title>ssr</title>
          <style>
          ${cssStr}
          </style>
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
