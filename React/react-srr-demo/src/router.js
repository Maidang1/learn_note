import App from './container/app';
import Home from './container/home';
import Counter from './container/counter';
import Login from './container/login';
import Logout from './container/logout';
import Profile from './container/profile';
import NotFound from './container/notfound';

export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    // 子路由
    components: [
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
      {
        path: '/login',
        component: Login,
        key: '/login',
      },
      {
        path: '/logout',
        component: Logout,
        key: '/logout',
      },
      {
        path: '/profile',
        component: Profile,
        key: '/profile',
      },
      {
        component: NotFound,
        key: '/notfound',
      },
    ],
  },
];

/*
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
*/
// export default (
//   <Fragment>
//     <Route path="/" exact component={Home} />
//     <Route path="/counter" exact component={Counter} />
//   </Fragment>
// );
