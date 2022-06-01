import * as types from '../actionTypes/categories';

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return [...action.payload];

    default:
      return state;
  }
};
