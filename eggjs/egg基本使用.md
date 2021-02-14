# eggjs的基本使用

## 自定义启动任务

###### app.js

```javascript
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 请将您的 app.beforeClose 中的代码置于此处。
    await this.app.runSchedule('updatecache');
  }
}
module.exports = AppBootHook;

```



## controller

###### app/controller/news.js

```javascript
const { Controller } = require('egg');

class NewsController extends Controller {
  async index() {
    let { ctx } = this;
    let limit = ctx.query.limit ? ctx.query.limit : 5;
    let list = await this.service.news.list(limit);
    let title = this.ctx.app.cache
      ? this.ctx.app.cache.title
        ? this.ctx.app.cache.title
        : '默认标题'
      : '默认标题';
    await ctx.render('news', { list, title });
  }
}

module.exports = NewsController;

```



## service

###### app/service/news.js

```javascript
const { Service } = require('egg');

class NewsService extends Service {
  async list(limit) {
    const { config, ctx } = this;
    let url = config.news.url;
    let result = await ctx.curl(url, {
      method: 'GET',
      data: { limit },
      dataType: 'json',
    });
    return result.data.data;
  }
}

module.exports = NewsService;

```



## schedule

###### app/schedule/updatecache.js

```javascript
const { Subscription } = require('egg');

class UpdateCachSubscription extends Subscription {
  static get schedule() {
    return {
      interval: '5m',
      type: 'all',
    };
  }
  async subscribe() {
    const res = await this.ctx.curl(this.config.cache.url, {
      method: 'GET',
      dataType: 'json',
    });
    this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCachSubscription;

```

## view

###### app/view/news.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="../public/bootstrap/dist/css/bootstrap.css" />
  </head>
  <body>
    <div class="container">
      <h3 class="text-center">{{title}}</h3>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          {% for item in list%}
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="text-center">{{item.title}}</h3>
            </div>
            <div class="panel-body text-center">
              <img src="{{item.image}}" alt="" />
            </div>
            <div class="panel-footer">
              <h3 class="text-center">发表时间:{{item.createAt}}</h3>
            </div>
          </div>
          {% endfor%}
        </div>
      </div>
    </div>
  </body>
</html>

```



## router

###### app/router.js

```javascript
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/news', controller.news.index);
};

```



## config

######  config/config.default.js

```javascript
// 加密cookie 和 session的东西
module.exports = (app) => {
  let config = {};
  config.keys = 'hahah';
  config.view = {
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.news = {
    url: 'http://localhost:3000/news',
  };
  config.cache = {
    url: 'http://localhost:3000/title',
  };
  return config;
};

```



###### config/plugin.js

```javascript
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

```

