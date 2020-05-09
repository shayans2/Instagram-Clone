import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getCurrentUser } from "../services/authService";
import { userEdit } from "../actions";
import Navigation from "./common/Navigation";
import Sidebar from "./common/Sidebar";
import {
  RenderInput,
  RenderTextArea,
  RenderUploader,
  RenderButton,
} from "./common/RenderForm";

class Settings extends Component {
  onSubmit = (formValues) => {
    this.props.userEdit(formValues, getCurrentUser()._id);
  };

  renderForm = () => {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <RenderUploader
          name="profileImage"
          imageClassname="h-24 w-24 rounded-full mx-auto mt-4 mb-2"
          allowedFileExtensions="image/jpeg"
          buttonText="Change Profile Picture"
          currentImage={getCurrentUser().profileImage}
        />
        <RenderInput name="fullname" placeholder="Full Name" />
        <RenderInput name="username" placeholder="Username" disabled />
        <RenderTextArea name="biography" placeholder="Bio" />
        <RenderInput name="website" placeholder="Website" />
        <RenderInput name="email" placeholder="Email" />
        <RenderButton text="Edit Profile" bgColor="blue" textColor="white" />
      </form>
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
                <h2 className="mb-6 font-semibold text-3xl">Edit Profile</h2>
                {this.props.errors.ex && this.renderError()}
                {this.renderForm()}
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
  const initialValues = getCurrentUser();
  delete initialValues.followers;
  delete initialValues.following;
  return {
    errors: state.errors,
    initialValues,
  };
};

export default connect(mapStateToProps, { userEdit })(
  reduxForm({
    form: "settingsForm",
  })(Settings)
);
