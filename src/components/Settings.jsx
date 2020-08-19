import React, { useState, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../services/authService";
import { userEdit } from "../actions";
import Navigation from "./common/Navigation";
import Sidebar from "./common/Sidebar";
import { RenderUploader, RenderButton, renderInput } from "./common/RenderForm";
import { settingsValidation } from "../utility/formValidation";
import { useEffect } from "react";

const Settings = ({ handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const errors = useSelector((state) => state.errors);
  const data = useSelector((state) => state.users);
  const disptach = useDispatch();

  const onSubmit = (formValues) => {
    disptach(userEdit(formValues, getCurrentUser()._id));
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <RenderUploader
          name="profileImage"
          imageClassname="h-24 w-24 rounded-full mx-auto mt-4 mb-2"
          allowedFileExtensions="image/jpeg"
          buttonText="Change Profile Picture"
          currentImage={getCurrentUser().profileImage}
        />
        <Field name="fullname" component={renderInput} label="Full name" />
        <Field name="username" component={renderInput} label="Username" />
        <label className="font-semibold text-gray-800 text-sm">Bio</label>
        <Field
          className="mt-1 mb-2 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
          type="text"
          name="biography"
          component="textarea"
          placeholder="Bio"
          maxLength="400"
        />
        <Field name="website" component={renderInput} label="Website" />
        <Field name="email" component={renderInput} label="Email" />
        {isLoading ? (
          <RenderButton text="Saving..." disabled />
        ) : (
          <RenderButton text="Edit Profile" bgColor="blue" textColor="white" />
        )}
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
    <Fragment>
      <Navigation />
      <div className="mx-auto flex max-w-5xl mt-8">
        <div className="w-3/5">
          <div className="bg-white border border-gray-400 rounded mb-6">
            <div className="p-12 mb-3">
              <h2 className="mb-6 font-semibold text-3xl">Edit Profile</h2>
              {errors.ex && renderError()}
              {renderForm()}
            </div>
          </div>
        </div>
        <div className="w-2/5 ml-6">
          <Sidebar />
        </div>
      </div>
    </Fragment>
  );
};

export default reduxForm({
  form: "settingsForm",
  validate: settingsValidation,
  initialValues: getCurrentUser(),
})(Settings);
