import * as types from '../actionTypes';

export const showLoader = (): Object => ({ type: types.SHOW_LOADER });

export const hideLoader = (): Object => ({ type: types.HIDE_LOADER });

export const showError = (): Object => ({ type: types.SHOW_ERROR });

export const hideError = (): Object => ({ type: types.HIDE_ERROR });

export const showAlert = (message): Object => ({ type: types.SHOW_ALERT, payload: message });

export const hideAlert = (): Object => ({ type: types.HIDE_ALERT });

export const setCurrentLocation = (locationId: number): Object => ({ type: types.SET_CURRENT_LOCATION, payload: locationId });
