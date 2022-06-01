import * as types from '../actionTypes/reports';

export const dailyReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_DAILY_REPORTS:
      return { ...action.payload };

    default:
      return state;
  }
};
