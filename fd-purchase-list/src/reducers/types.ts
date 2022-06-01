import * as types from '../actionTypes/types';

export const typesReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_TYPES:
      return [...action.payload];

    default:
      return state;
  }
};
