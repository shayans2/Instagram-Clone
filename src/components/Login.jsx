import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../actions";
import { Link } from "react-router-dom";
import { RenderButton, renderInput } from "./common/RenderForm";
import authService from "../services/authService";
import { loginValidation } from "../utility/formValidation";

const Login = ({ handleSubmit }) => {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.logout();
  }, []);

  const onSubmit = (formValues) => {
    dispatch(userLogin(formValues));
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="email" component={renderInput} label="Email" />
        <Field
          name="password"
          type="password"
          component={renderInput}
          label="Password"
        />
        <RenderButton text="Log In" bgColor="blue" textColor="white" />
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
          {errors.ex && renderError()}
          {renderForm()}
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
};

export default reduxForm({ form: "loginForm", validate: loginValidation })(
  Login
);
