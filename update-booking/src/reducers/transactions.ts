import * as types from '../actionTypes/transactions';

export const transactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TRANSACTIONS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
