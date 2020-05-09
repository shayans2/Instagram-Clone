import React, { Component } from "react";

class Uploader extends Component {
  state = {
    file: this.props.currentImage,
  };
  render() {
    const {
      input,
      name,
      imageClassName,
      allowedFileExtensions,
      buttonText,
    } = this.props;

    const handleChange = (e) => {
      input.onChange(e.target.files[0]);

      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: reader.result,
        });
      };
      try {
        reader.readAsDataURL(file);
      } catch {}
    };

    return (
      <div className="text-center mx-auto">
        <img
          src={this.state.file}
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
  }
}

export default Uploader;
