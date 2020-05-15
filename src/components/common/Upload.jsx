import React, { useState } from "react";

const Uploader = ({
  input,
  name,
  imageClassName,
  allowedFileExtensions,
  buttonText,
  currentImage,
}) => {
  const [file, setFile] = useState(currentImage);
  const [error, setError] = useState(null);

  const renderError = () => {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="text-sm text-left">File size must be less than 3MB</p>
      </div>
    );
  };

  const handleChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file && file.size / 1024 / 1024 > 3) {
      setError(true);
    } else {
      setError(false);
    }
    reader.onloadend = () => {
      if (!error) {
        input.onChange(file);
        setFile(reader.result);
      }
    };

    try {
      reader.readAsDataURL(file);
    } catch {}
  };

  return (
    <div className="text-center mx-auto">
      {error && renderError()}
      <img
        src={file}
        className={imageClassName}
        alt="Image"
        aria-hidden="true"
        style={{ objectFit: "cover" }}
      />
      <label
        htmlFor="uploadField"
        className="font-semibold text-blue-700 text-sm cursor-pointer"
      >
        {buttonText}
      </label>
      <input
        name={name}
        id="uploadField"
        className="hidden"
        type="file"
        onChange={handleChange}
        accept={allowedFileExtensions}
      />
    </div>
  );
};

export default Uploader;
