import {
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  FETCH_CURRENT_USER,
  FETCH_USER,
  USER_EDIT_SUCCESS,
  HANDLE_USER_FOLLOW,
} from "../actions/types";
import authService from "../services/authService";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      authService.loginWithJwt(action.payload);
      return { ...state, currentUser: authService.getCurrentUser() };
    case USER_LOGIN_SUCCESS:
      authService.loginWithJwt(action.payload);
      return { ...state, currentUser: authService.getCurrentUser() };
    case USER_EDIT_SUCCESS:
      authService.loginWithJwt(action.payload);
      return {
        ...state,
        currentUser: authService.getCurrentUser(),
        isLoading: action.payload,
      };
    case FETCH_CURRENT_USER:
      // authService.logout();
      return { ...state, currentUser: authService.getCurrentUser() };
    case FETCH_USER:
      return { ...state, userDetails: action.payload };
    case HANDLE_USER_FOLLOW:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};
