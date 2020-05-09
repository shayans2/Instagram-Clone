import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { userLogin } from "../actions";
import { Link } from "react-router-dom";
import { RenderInput, RenderButton } from "./common/RenderForm";
import authService from "../services/authService";

class Login extends Component {
  componentDidMount() {
    authService.logout();
  }

  onSubmit = (formValues) => {
    this.props.userLogin(formValues);
  };

  renderForm = () => {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <RenderInput name="email" type="email" placeholder="Email" />
        <RenderInput
          name="password"
          type="password"
          placeholder="Password"
          minLength="5"
        />
        <RenderButton text="Log In" bgColor="blue" textColor="white" />
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
      <div className="mx-auto max-w-md items-center justify-center p-8">
        <div className="bg-white shadow-sm pt-6 border border-gray-400">
          <h1 className="text-center text-2xl text-gray-900">
            Instagram Clone
          </h1>
          <div className="p-8">
            {this.props.errors.ex && this.renderError}
            {this.renderForm()}

            <p className="text-center text-blue-800 mt-5 font-light text-xs">
              Forgot password?
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-400 mt-3">
          <p className="text-center text-gray-800 font-light text-xs">
            Don't have an account?
            <Link to="/signup" className="font-semibold text-blue-500">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { userLogin })(
  reduxForm({
    form: "loginForm",
  })(Login)
);
