import * as types from '../actionTypes';

export const updatesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_UPDATES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
