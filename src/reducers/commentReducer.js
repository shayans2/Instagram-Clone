import { FETCH_COMMENTS, POST_COMMENT_SUCCESS } from "../actions/types";

const initialState = {
  postComment: [],
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        postComment: action.payload,
      };

    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        postComment: [...state.postComment, action.payload],
      };

    default:
      return state;
  }
};
