import * as types from '../actionTypes';

export const managerAnalyticsReducer = (state = {}, action): Object => {
  switch (action.type) {
    case types.SET_MANAGER_ANALYTICS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
