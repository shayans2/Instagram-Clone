import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  FETCH_CURRENT_USER,
  FETCH_USER,
  FETCH_DASHBOARD_POSTS,
  FETCH_POST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  HANDLE_POST_LIKE,
  FETCH_COMMENTS,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  FETCH_PROFILE_POSTS,
  HANDLE_USER_FOLLOW,
} from "./types";
import httpService from "../services/main";
import { history } from "../history";

export const userSignup = (formValues) => async (dispatch) => {
  try {
    const response = await httpService.post("/users/new", formValues);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: response.headers["x-auth-token"],
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: err.response });
  }
};

export const userLogin = (formValues) => async (dispatch) => {
  try {
    const response = await httpService.post("/auth/", formValues);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.headers["x-auth-token"],
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response });
  }
};

export const userEdit = (formValues, userId) => async (dispatch) => {
  let formData = new FormData();
  for (let [key, value] of Object.entries(formValues)) {
    formData.append(key, value);
  }

  try {
    const response = await httpService.put(`/users/edit/${userId}`, formData);
    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: response.headers["x-auth-token"],
    });
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: USER_EDIT_FAIL, payload: err.response });
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: FETCH_CURRENT_USER });
};

export const fetchUser = (userId) => async (dispatch) => {
  const response = await httpService.get(`/users/${userId}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchDashboardPosts = (userId, currentPage, pageSize) => async (
  dispatch
) => {
  const response = await httpService.get(
    `/posts/followers/${userId}/${currentPage}/${pageSize}`
  );
  dispatch({ type: FETCH_DASHBOARD_POSTS, payload: response.data });
};

export const fetchPost = (postId) => async (dispatch) => {
  const response = await httpService.get(`/posts/${postId}`);
  dispatch({ type: FETCH_POST, payload: response.data });
};

export const fetchProfilePosts = (userId) => async (dispatch) => {
  const response = await httpService.get(`/posts/profile/${userId}`);
  dispatch({ type: FETCH_PROFILE_POSTS, payload: response.data });
};

export const newPost = (formValues, userId) => async (dispatch) => {
  let formData = new FormData();
  for (let [key, value] of Object.entries(formValues)) {
    formData.append(key, value);
  }
  formData.append("userId", userId);

  try {
    const response = await httpService.post(`/posts/new`, formData);
    dispatch({ type: NEW_POST_SUCCESS, payload: response.data });
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: NEW_POST_FAIL, payload: err.response });
  }
};

export const handleLike = (postId, userId, type) => async (dispatch) => {
  const response = await httpService.put(`/posts/${type}/${postId}`, {
    userId,
  });
  dispatch({ type: HANDLE_POST_LIKE, payload: response.data });
};

export const fetchComments = (postId) => async (dispatch) => {
  const response = await httpService.get(`/comments/posts/${postId}`);
  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const postComment = (formValues, postId, userId) => async (dispatch) => {
  let formData = {
    postId,
    userId,
    content: formValues.content,
  };

  try {
    const response = await httpService.post("/comments/new", formData);
    dispatch({ type: POST_COMMENT_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: POST_COMMENT_FAIL, payload: err.response });
  }
};

export const handleFollow = (followerId, followingId, type) => async (
  dispatch
) => {
  const response = await httpService.put(`/users/${type}/${followingId}`, {
    followerId,
  });
  dispatch({ type: HANDLE_USER_FOLLOW, payload: response.data });
};
