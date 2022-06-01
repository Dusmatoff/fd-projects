import * as types from '../actionTypes';

export const employeesHoursReducer = (state = {}, action): Object => {
  switch (action.type) {
    case types.SET_EMPLOYEES_HOURS:
      return { ...action.payload };

    default:
      return state;
  }
};
