import * as types from '../actionTypes/packages';

export const packagesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_PACKAGES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
