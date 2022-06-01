import * as types from '../actionTypes';

export const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_COMMENTS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
