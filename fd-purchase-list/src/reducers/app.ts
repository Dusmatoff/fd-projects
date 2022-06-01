import * as types from '../actionTypes/app';

const initialState: {
    loadersCount: number,
    error: boolean,
    alert: boolean,
    purchaseLogs: Array<any>,
    editPurchase: object | null
} = {
  loadersCount: 0,
  error: false,
  alert: false,
  purchaseLogs: [],
  editPurchase: null,
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

    case types.SET_PURCHASE_LOGS:
      return { ...state, purchaseLogs: action.payload };

    case types.SET_EDIT_PURCHASE:
      return { ...state, editPurchase: action.payload };

    default:
      return state;
  }
};
