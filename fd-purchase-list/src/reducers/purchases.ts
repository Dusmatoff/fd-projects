import * as types from '../actionTypes/purchases';

export const purchasesReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_PURCHASES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
