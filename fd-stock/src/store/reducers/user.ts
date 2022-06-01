import * as types from '../actionTypes/user';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
