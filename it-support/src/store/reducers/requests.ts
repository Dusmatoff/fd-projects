import * as types from '../actionTypes';

export const requestsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_REQUESTS:
      return [...action.payload];

    default:
      return state;
  }
};
