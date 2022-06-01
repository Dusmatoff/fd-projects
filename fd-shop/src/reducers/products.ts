import * as types from '../actionTypes/products';

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_PRODUCTS:
      state = action.payload;
      return state;

    default:
      return state;
  }
};
