import {
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  FETCH_CURRENT_USER,
  FETCH_USER,
  USER_EDIT_SUCCESS,
  HANDLE_USER_FOLLOW,
  USER_RESET
} from "../actions/types";
import { getCurrentUser } from "../services/authService";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return { ...state, currentUser: getCurrentUser() };
    case USER_LOGIN_SUCCESS:
      return { ...state, currentUser: getCurrentUser() };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        currentUser: getCurrentUser(),
        isLoading: action.payload,
      };
    case FETCH_CURRENT_USER:
      return { ...state, currentUser: getCurrentUser() };
    case FETCH_USER:
      return { ...state, userDetails: action.payload };
    case HANDLE_USER_FOLLOW:
      return { ...state, userDetails: action.payload };
    case USER_RESET:
      return state
    default:
      return state;
  }
};
