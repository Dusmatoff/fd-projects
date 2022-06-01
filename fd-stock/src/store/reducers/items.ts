import * as types from '../actionTypes/items';

export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_ITEMS:
      return [...action.payload];

    default:
      return state;
  }
};
