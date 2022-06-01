import * as types from '../actionTypes/inventory';

export const inventoryReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_INVENTORY:
      return [...action.payload];

    default:
      return state;
  }
};
