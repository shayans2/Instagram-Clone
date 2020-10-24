import React, { useEffect, useMemo } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, postComment } from "../../actions";
import { getCurrentUser } from "../../services/authService";
import { RenderButton } from "../common/RenderForm";

const Comments = ({ postId, handleSubmit, ...props }) => {
  const comments = useSelector((state) => state.comments.postComment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, []);

  const onSubmit = (formValues) => {
    dispatch(postComment(formValues, postId, getCurrentUser()._id));
  };

  const renderComments = () => {
    if (comments.length === 0) {
      return <p className="font-semibold text-gray-900 text-sm">No comments</p>;
    } else {
      return comments.map((comment) => (
        <span className="font-semibold text-sm" key={comment._id}>
          {comment.userId.username ? comment.userId.username : "You"}{" "}
          <span className="font-normal text-xs leading-tight text-gray-600">
            {comment.content}
          </span>
          <p className="mb-2"></p>
        </span>
      ));
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          className="mt-3 mb-2 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
          type="text"
          name="content"
          component="textarea"
          placeholder="Write your comment"
          maxLength="400"
        />
        <RenderButton text="Send" bgColor="blue" textColor="white" />
    </form>
    )
  }

  return (
    <div className="bg-white border border-b rounded px-5 py-3">
      <span className="font-semibold text-gray-600 text-sm">Comments</span>
      <div className="pl-2 pt-3 mb-3">{renderComments()}</div>
      {useMemo(() => renderForm(), [])}
    </div>
  );
};

export default reduxForm({
  form: "commentForm",
})(Comments);
