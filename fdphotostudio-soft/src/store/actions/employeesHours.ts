import * as types from '../actionTypes';
import { ajaxGet } from '../../utils';

export const fetchEmployeesHours = (locationId: number, from: string, to: string) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('fdsoft/employees-hours', { locationId, from, to });

    dispatch({ type: types.SET_EMPLOYEES_HOURS, payload: result });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
