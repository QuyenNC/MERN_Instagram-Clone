import {
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CONFIRMATION_SUCCESS,
  CONFIRMATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SENDMAIL_SUCCESS,
  SENDMAIL_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_AVATAR,
  LOADING_AVATAR,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  LOGOUT,
  LOADING_SEND_EMAIL,
  RESEND_EMAIL,
  STOP_LOADING,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  loading2: true,
  user: null,
  error: null,
  isSendEmail: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        loading2: false,
        user: payload,
      };
    case CONFIRMATION_SUCCESS:
    case LOGIN_SUCCESS:
    case CHANGE_PASSWORD:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        loading2: false,
        error: null,
      };
    case CONFIRMATION_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loading2: false,
        user: null,
        error: payload,
      };
    case SENDMAIL_SUCCESS:
      return {
        ...state,
        isSendEmail: true,
        loading: false,
        loading2: false,
      };
    case SENDMAIL_FAIL:
      return {
        ...state,
        isSendEmail: false,
        loading: false,
        loading2: false,
      };
    case LOADING:
    case LOADING_AVATAR:
    case LOADING_SEND_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_AVATAR:
    case EDIT_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case CHANGE_EMAIL:
    case RESEND_EMAIL:
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
