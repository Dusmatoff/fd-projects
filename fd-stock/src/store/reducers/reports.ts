import * as types from '../actionTypes/reports';

export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_REPORTS:
      return [...action.payload];

    default:
      return state;
  }
};
