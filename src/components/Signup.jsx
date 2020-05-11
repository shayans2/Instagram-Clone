import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { userSignup } from "../actions";
import { Link } from "react-router-dom";
import { RenderButton, renderInput } from "./common/RenderForm";
import { signupValidation } from "../utility/formValidation";

const Signup = ({ userSignup, handleSubmit, errors }) => {
  const onSubmit = (formValues) => {
    userSignup(formValues);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="fullname" component={renderInput} label="Full name" />
        <Field name="username" component={renderInput} label="Username" />
        <Field name="email" component={renderInput} label="Email" />
        <Field
          name="password"
          type="password"
          component={renderInput}
          label="Password"
        />
        <RenderButton text="Sign up" bgColor="blue" textColor="white" />
      </form>
    );
  };

  const renderError = () => {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="text-sm">{errors.ex.data}</p>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-md items-center justify-center p-8">
      <div className="bg-white shadow-sm pt-6 border border-gray-400">
        <h1 className="text-center text-2xl text-gray-900">Instagram Clone</h1>

        <div className="p-8">
          <p className="font-bold text-gray-500 text-center mb-8">
            Sign up to see photos and videos from your friends.
          </p>
          {errors.ex && renderError()}
          {renderForm()}
          <p className="text-sm text-center text-gray-800">
            By signing up, you agree to our{" "}
            <b>Terms, Data Policy and Cookies </b>
            Policy.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-sm p-6 border border-gray-400 mt-3">
        <p className="text-center text-gray-800 font-light text-xs">
          Have an account?
          <Link to="/login" className="font-semibold text-blue-500">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { userSignup })(
  reduxForm({
    form: "signupForm",
    validate: signupValidation,
  })(Signup)
);
