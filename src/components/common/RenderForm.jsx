import React, { Fragment } from "react";
import { Field } from "redux-form";
import Upload from "./Upload";

export const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <Fragment>
    <label className="font-semibold text-gray-800 text-sm">{label}</label>
    <input
      {...input}
      placeholder={label}
      type={type}
      className="mt-1 mb-4 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
    />
    {touched && error && (
      <div className="font-semibold bg-red-200 h-auto p-2 rounded-sm text-red-700 text-xs mb-4">
        {error}
      </div>
    )}
  </Fragment>
);

export const RenderUploader = ({
  name,
  imageClassname,
  allowedFileExtensions,
  buttonText,
  currentImage,
}) => {
  return (
    <Field
      name={name}
      imageClassName={imageClassname}
      allowedFileExtensions={allowedFileExtensions}
      buttonText={buttonText}
      component={Upload}
      currentImage={currentImage}
    />
  );
};

export const RenderButton = ({ text, bgColor, textColor }) => {
  return (
    <button
      className={`bg-${bgColor}-600 text-${textColor} font-bold text-sm py-2 px-4 rounded w-full`}
    >
      {text}
    </button>
  );
};
