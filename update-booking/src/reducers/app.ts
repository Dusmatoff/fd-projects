import * as types from '../actionTypes/app';

const initialState: {
    loadersCount: number,
    error: boolean,
    bookingId: string | null,
    alert: boolean,
    continueOverlapping: boolean,
    showCreateClientModal: boolean,
    createClientContent: Object,
    prepareClientHours: Object,
    cart: Object,
    user: Object,
} = {
  loadersCount: 0,
  error: false,
  bookingId: null,
  alert: false,
  continueOverlapping: false,
  showCreateClientModal: false,
  createClientContent: {},
  prepareClientHours: {},
  cart: { items: [], total: 0, isAddedEstimate: false },
  user: {},
};

export const appReducer = (state = initialState, action): Object => {
  switch (action.type) {
    case types.SET_BOOKING_ID:
      return { ...state, bookingId: action.payload.bookingId };

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

    case types.SHOW_CREATE_CLIENT_MODAL:
      return { ...state, showCreateClientModal: true, createClientContent: action.payload };

    case types.HIDE_CREATE_CLIENT_MODAL:
      return { ...state, showCreateClientModal: false };

    case types.SET_PREPARE_CLIENT_HOURS:
      return { ...state, prepareClientHours: action.payload };

    case types.SET_CART:
      return { ...state, cart: action.payload };

    case types.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
