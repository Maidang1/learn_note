import express from 'express';
import { resolve } from 'path';
import proxy from 'express-http-proxy';
import render from './render';

const app = express();
app.use(express.static(resolve('public')));

app.use(
  '/api',
  proxy('http://127.0.0.1:4000', {
    proxyReqPathResolver(req) {
      return `/api${req.url}`;
    },
  })
);
app.get('*', function (req, res) {

  render(req, res);
});

app.listen(3000);
