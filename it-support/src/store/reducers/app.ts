import * as types from '../actionTypes';

const initialState: {
    loadersCount: number,
    error: boolean,
    alert: boolean,
    showNewRequest: boolean,
    showList: boolean,
  screenshot: any,
} = {
  loadersCount: 0,
  error: false,
  alert: false,
  showNewRequest: false,
  showList: false,
  screenshot: null,
};

export const appReducer = (state = initialState, action): Object => {
  switch (action.type) {
    case types.SHOW_LOADER:
      return { ...state, loadersCount: state.loadersCount + 1 };

    case types.HIDE_LOADER:
      return { ...state, loadersCount: (state.loadersCount > 0) ? state.loadersCount - 1 : 0 };

    case types.SHOW_ERROR:
      return { ...state, error: true, errorMessage: action.payload };

    case types.HIDE_ERROR:
      return { ...state, error: false };

    case types.SHOW_ALERT:
      return { ...state, alert: true, successMessage: action.payload };

    case types.HIDE_ALERT:
      return { ...state, alert: false };

    case types.SHOW_NEW_REQUEST:
      return { ...state, showNewRequest: true };

    case types.HIDE_NEW_REQUEST:
      return { ...state, showNewRequest: false };

    case types.SHOW_LIST:
      return { ...state, showList: true };

    case types.HIDE_LIST:
      return { ...state, showList: false };

    case types.MAKE_SCREENSHOT:
      return { ...state, screenshot: action.payload };

    default:
      return state;
  }
};
