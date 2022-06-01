import * as types from '../actionTypes/app';
import * as reportsTypes from '../actionTypes/reports';
import { ajaxGet } from '../../utils';
import {SET_DAILY_REPORTS} from "../actionTypes/reports";

export const fetchReports = (locationId: number, isDeleted: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const reports = await ajaxGet('stock/inventory-reports', { locationId, isDeleted });

    dispatch({ type: reportsTypes.SET_REPORTS, payload: reports });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const fetchDailyReports = (date: string) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const dailyReports = await ajaxGet('stock/daily-reports', { date });

    dispatch({ type: reportsTypes.SET_DAILY_REPORTS, payload: dailyReports });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
