import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { getCurrentUser } from "../services/authService";
import { newPost } from "../actions";
import Navigation from "./common/Navigation";
import Sidebar from "./common/Sidebar";
import { RenderUploader, RenderButton, renderInput } from "./common/RenderForm";

class PostForm extends Component {
  state = {
    formStage: 1,
  };
  onSubmit = (formValues) => {
    this.props.newPost(formValues, getCurrentUser()._id);
  };
  renderStageOne = () => {
    return (
      <Fragment>
        <RenderUploader
          name="postImage"
          imageClassname="mx-auto h-128 w-128 mt-4 mb-8"
          allowedFileExtensions="image/jpeg"
          buttonText="Choose an Image"
          currentImage="http://localhost:4000/uploads/default-post.jpg"
        />
        <p
          onClick={() => {
            this.setState({ formStage: 2 });
          }}
          className="text-center font-semibold text-sm text-gray-900 cursor-pointer mt-8"
        >
          Next Step &rarr;
        </p>
      </Fragment>
    );
  };

  renderStageTwo = () => {
    return (
      <Fragment>
        <Field
          name="location"
          component={renderInput}
          label="Picture Location"
        />
        <label className="font-semibold text-gray-800 text-sm">
          Post caption
        </label>
        <Field
          className="mt-1 mb-2 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
          type="text"
          name="caption"
          component="textarea"
          placeholder="Post caption"
          maxLength="400"
        />
        <RenderButton text="Post" bgColor="blue" textColor="white" />
        <p
          onClick={() => {
            this.setState({ formStage: 1 });
          }}
          className="text-center font-semibold text-sm text-gray-900 cursor-pointer mt-5"
        >
          &larr; Go back
        </p>
      </Fragment>
    );
  };

  renderError = () => {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="text-sm">{this.props.errors.ex.data}</p>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="mx-auto flex max-w-5xl mt-8">
          <div className="w-3/5">
            <div className="bg-white border border-gray-400 rounded mb-6">
              <div className="p-12 mb-3">
                <h2 className="mb-6 font-semibold text-3xl">New Post</h2>

                {this.props.errors.ex && this.renderError()}

                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  {this.state.formStage === 1 && this.renderStageOne()}
                  {this.state.formStage === 2 && this.renderStageTwo()}
                </form>
              </div>
            </div>
          </div>
          <div className="w-2/5 ml-6">
            <Sidebar />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { newPost })(
  reduxForm({
    form: "newPostForm",
    enableReinitialize: true,
  })(PostForm)
);
