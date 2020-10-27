import * as actions from "./types";
import httpService from "../services/httpService";
import { loginWithJwt } from "../services/authService";

export const userSignup = (formValues) => async (dispatch) => {
  try {
    const response = await httpService.post("/users/new", formValues);
    dispatch({
      type: actions.USER_SIGNUP_SUCCESS,
      payload: response.headers["x-auth-token"],
    });
    loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: actions.USER_SIGNUP_FAIL, payload: err.response });
  }
};

export const userLogin = (formValues) => async (dispatch) => {
  try {
    const response = await httpService.post("/auth/", formValues);
    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: response.headers["x-auth-token"],
    }); 
    loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: actions.USER_LOGIN_FAIL, payload: err.response });
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
      type: actions.USER_EDIT_SUCCESS,
      payload: response.headers["x-auth-token"],
    });
    loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: actions.USER_EDIT_FAIL, payload: err.response });
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: actions.FETCH_CURRENT_USER });
};

export const fetchSingleUser = (userId) => async (dispatch) => {
  const response = await httpService.get(`/users/${userId}`);
  dispatch({ type: actions.FETCH_USER, payload: response.data });
};

export const fetchTimeline = (userId, currentPage, pageSize) => async (
  dispatch
) => {
  const response = await httpService.get(
    `/posts/followers/${userId}/${currentPage}/${pageSize}`
  );
  dispatch({ type: actions.FETCH_TIMELINE, payload: response.data });
};

export const fetchPost = (postId) => async (dispatch) => {
  const response = await httpService.get(`/posts/${postId}`);
  dispatch({ type: actions.FETCH_POST, payload: response.data });
};

export const fetchProfilePosts = (userId) => async (dispatch) => {
  const response = await httpService.get(`/posts/profile/${userId}`);
  dispatch({ type: actions.FETCH_PROFILE_POSTS, payload: response.data });
};

export const newPost = (formValues, userId) => async (dispatch) => {
  let formData = new FormData();
  for (let [key, value] of Object.entries(formValues)) {
    formData.append(key, value);
  }
  formData.append("userId", userId);

  try {
    const response = await httpService.post(`/posts/new`, formData);
    dispatch({ type: actions.NEW_POST_SUCCESS, payload: response.data });
    window.location = "/dashboard";
  } catch (err) {
    dispatch({ type: actions.NEW_POST_FAIL, payload: err.response });
  }
};

export const handleLike = (postId, userId, type) => async (dispatch) => {
  const response = await httpService.put(`/posts/${type}/${postId}`, {
    userId,
  });
  dispatch({ type: actions.HANDLE_POST_LIKE, payload: response.data });
};

export const fetchComments = (postId) => async (dispatch) => {
  const response = await httpService.get(`/comments/posts/${postId}`);
  dispatch({ type: actions.FETCH_COMMENTS, payload: response.data });
};

export const postComment = (formValues, postId, userId) => async (dispatch) => {
  let formData = {
    postId,
    userId,
    content: formValues.content,
  };

  try {
    const response = await httpService.post("/comments/new", formData);
    dispatch({ type: actions.POST_COMMENT_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: actions.POST_COMMENT_FAIL, payload: err.response });
  }
};

export const handleFollow = (followerId, followingId, type) => async (
  dispatch
) => {
  const response = await httpService.put(`/users/${type}/${followingId}`, {
    followerId,
  });
  dispatch({ type: actions.HANDLE_USER_FOLLOW, payload: response.data });
};
