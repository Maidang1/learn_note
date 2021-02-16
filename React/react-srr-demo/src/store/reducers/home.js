import * as types from '../action-type';
let initState = { list: [] };

export default function (state = initState, action) {
  switch (action.type) {
    case types.SET_LIST:
      return {
        list: action.payload,
      };
    default:
      return state;
  }
}
