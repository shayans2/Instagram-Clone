import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchComments, postComment } from "../../actions";
import { getCurrentUser } from "../../services/authService";
import { RenderButton } from "../common/RenderForm";

class Comments extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  renderComments = () => {
    if (this.props.comments.length === 0) {
      return <p className="font-semibold text-gray-900 text-sm">No comments</p>;
    } else {
      return this.props.comments.map((comment) => (
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

  onSubmit = (formValues) => {
    this.props.postComment(formValues, this.props.postId, getCurrentUser()._id);
  };
  render() {
    return (
      <div className="bg-white border border-b rounded px-5 py-3">
        <span className="font-semibold text-gray-600 text-sm">Comments</span>
        <div className="pl-2 pt-3 mb-3">{this.renderComments()}</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.postComment,
  };
};

export default connect(mapStateToProps, { fetchComments, postComment })(
  reduxForm({
    form: "commentForm",
  })(Comments)
);
