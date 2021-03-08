## koa-router

```javascript
class Router {
  constructor() {
    this.middlewares = [];
  }
  get(pathname, middleware) {
    this.middlewares.push({
      path: pathname,
      middleware,
      method: 'get',
    });
  }
  compose(arr, next, ctx) {
    // koa核心
    function dispatch(index) {
      if (index === arr.length) return next();
      let middle = arr[index];
      return Promise.resolve(middle.middleware(ctx, () => dispatch(index + 1)));
    }

    return dispatch(0);
  }
  routers() {
    return async (ctx, next) => {
      let method = ctx.method.toLowerCase();
      let path = ctx.path;
      let arr = this.middlewares.filter((middleware) => {
        return middleware.method === method && middleware.path === path;
      });
      this.compose(arr, next, ctx);
    };
  }
}

module.exports = Router;

```

