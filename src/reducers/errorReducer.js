import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_EDIT_FAIL,
  NEW_POST_FAIL,
  POST_COMMENT_FAIL,
} from "../actions/types";

const initState = {
  ex: null,
};

export const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_SIGNUP_FAIL:
      return { ...state, ex: action.payload };
    case USER_SIGNUP_SUCCESS:
      return { ...state, ex: null };
    case USER_LOGIN_FAIL:
      return { ...state, ex: action.payload };
    case USER_LOGIN_SUCCESS:
      return { ...state, ex: null };
    case USER_EDIT_FAIL:
      return { ...state, ex: action.payload };
    case NEW_POST_FAIL:
      return { ...state, ex: action.payload };
    case POST_COMMENT_FAIL:
      return { ...state, ex: action.payload };
    default:
      return state;
  }
};
