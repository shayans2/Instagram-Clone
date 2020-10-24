import _ from "lodash";
import {
  FETCH_TIMELINE,
  FETCH_POST,
  HANDLE_POST_LIKE,
  NEW_POST_SUCCESS,
  FETCH_PROFILE_POSTS,
} from "../actions/types";

const initialState = {
  timeline: [],
  timelinePostsCount: null,
  singlePost: [],
  profilePosts: [],
  currentPage: 1,
  pageSize: 5,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TIMELINE:
      return {
        ...state,
        timeline: _.mapKeys(action.payload.posts, "_id"),
        timelinePostsCount: action.payload.postsCount,
        currentPage: parseInt(action.payload.page),
      };
    case FETCH_POST:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          [action.payload._id]: action.payload,
        },
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        timeline: {
          ...state.timeline,
          [action.payload._id]: action.payload,
        },
        isLoading: action.payload,
      };

    case FETCH_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: action.payload,
      };

    case HANDLE_POST_LIKE:
      return {
        ...state,
        timeline: {
          ...state.timeline,
          [action.payload._id]: action.payload,
        },
        singlePost: {
          ...state.singlePost,
          [action.payload._id]: action.payload,
        },
      };

    default:
      return state;
  }
};
