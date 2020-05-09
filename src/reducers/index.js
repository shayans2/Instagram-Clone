import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errorReducer";
import { postReducer } from "./postRedcuer";
import { commentReducer } from "./commentReducer";

export default combineReducers({
  users: userReducer,
  form: formReducer,
  errors: errorReducer,
  posts: postReducer,
  comments: commentReducer,
});
