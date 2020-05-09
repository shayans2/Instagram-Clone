import React, { Fragment } from "react";
import { Field } from "redux-form";
import Upload from "./Upload";

export const RenderInput = ({ name, placeholder, type = "text", ...rest }) => {
  return (
    <Fragment>
      <label htmlFor={name} className="font-semibold text-gray-800 text-sm">
        {placeholder}
      </label>
      <Field
        className="mt-1 mb-4 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
        type={type}
        name={name}
        id={name}
        component="input"
        placeholder={placeholder}
        {...rest}
      />
    </Fragment>
  );
};

export const RenderTextArea = ({ name, placeholder, maxLength, ...rest }) => {
  return (
    <Fragment>
      <label htmlFor={name} className="font-semibold text-gray-800 text-sm">
        {placeholder}
      </label>
      <Field
        className="mt-1 mb-6 appearance-none border rounded-sm w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
        type="text"
        name={name}
        id={name}
        component="textarea"
        placeholder={placeholder}
        maxLength={maxLength}
        {...rest}
      />
    </Fragment>
  );
};
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
