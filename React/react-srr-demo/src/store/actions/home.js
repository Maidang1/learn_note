import * as types from '../action-type';
export default {
  getHomeList() {
    return function (dispatch, getState, request) {
      return request.get('/api/users').then(function (res) {
        let list = res.data;
        dispatch({
          type: types.SET_LIST,
          payload: list,
        });
      });
    };
  },
};
