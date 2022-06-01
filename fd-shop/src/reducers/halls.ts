import * as types from '../actionTypes/halls';

export const hallsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_HALLS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
