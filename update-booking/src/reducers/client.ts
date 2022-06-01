import * as types from '../actionTypes/client';

export const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_CLIENT:
      return { ...state, ...action.payload };

    case types.SET_PHOTO:
      return { ...state, photo: action.payload.photo };

    case types.SET_SOCIALS:
      return { ...state, socials: action.payload.socials };

    default:
      return state;
  }
};
