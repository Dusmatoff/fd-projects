import * as types from '../actionTypes/vendors';

export const vendorsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_VENDORS:
      return [...action.payload];

    default:
      return state;
  }
};
