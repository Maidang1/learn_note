let express = require('express');
let body = require('body-parser');
let sessioin = require('express-session');
let app = express();
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(
  sessioin({
    saveUninitialized: true,
    resave: true,
    secret: '132',
  })
);
let users = [
  { id: 1, name: 'zhangsan' },
  { id: 2, name: 'lisi' },
];

app.get('/api/users', function (req, res) {
  res.json(users);
});

app.post('/api/login', function (req, res) {
  let user = req.body;
  req.session.user = user;
  res.json({
    code: 0,
    data: {
      user,
      success: 'login success',
    },
  });
});

app.get('/api/logout', function (req, res) {
  req.session.user = null;
  res.json({
    code: 0,
    data: {
      success: 'logout success',
    },
  });
});

app.get('/api/getuser', function (req, res) {
  let user = req.session.user;
  if (user) {
    res.json({
      code: 0,
      data: {
        user,
        success: '获取信息成功',
      },
    });
  } else {
    res.json({
      code: 1,
      data: {
        error: '未登录',
      },
    });
  }
});

app.listen(4000);
