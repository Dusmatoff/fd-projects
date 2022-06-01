import * as types from '../actionTypes';

export const showLoader = (): Object => ({ type: types.SHOW_LOADER });
export const hideLoader = (): Object => ({ type: types.HIDE_LOADER });

export const showError = (): Object => ({ type: types.SHOW_ERROR });
export const hideError = (): Object => ({ type: types.HIDE_ERROR });

export const showAlert = (message): Object => ({ type: types.SHOW_ALERT, payload: message });
export const hideAlert = (): Object => ({ type: types.HIDE_ALERT });

export const showNewRequest = (): Object => ({ type: types.SHOW_NEW_REQUEST });
export const hideNewRequest = (): Object => ({ type: types.HIDE_NEW_REQUEST });

export const showList = (): Object => ({ type: types.SHOW_LIST });
export const hideList = (): Object => ({ type: types.HIDE_LIST });

export const addScreenshot = (data): Object => ({ type: types.MAKE_SCREENSHOT, payload: data });
