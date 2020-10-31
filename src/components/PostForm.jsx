import React, { useState, useEffect, Fragment } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../services/authService";
import { newPost } from "../actions";
import Navigation from "./common/Navigation";
import Sidebar from "./common/Sidebar";
import { RenderUploader, RenderButton, renderInput } from "./common/RenderForm";
import DefaultPost from "../dist/images/default-post.jpg"

const PostForm = ({ handleSubmit }) => {
  const [formStage, setFormStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const errors = useSelector((state) => state.errors);
  const data = useSelector((state) => state.posts);
  const postImage = useSelector((state) =>
    formValueSelector("newPostForm")(state, "postImage")
  );
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(newPost(formValues, getCurrentUser()._id));
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const renderStageOne = () => {
    return (
      <Fragment>
        <RenderUploader
          name="postImage"
          imageClassname="mx-auto h-50 w-50 md:h-128 md:w-128 mt-4 mb-8"
          allowedFileExtensions="image/jpeg"
          buttonText="Choose an Image"
          currentImage={DefaultPost}
        />
        <p
          onClick={() => setFormStage(2)}
          className="text-center font-semibold text-sm text-gray-900 cursor-pointer mt-8"
        >
          Next Step &rarr;
        </p>
      </Fragment>
    );
  };

  const renderStageTwo = () => {
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
        {postImage !== undefined && isLoading ? (
          <RenderButton text="Saving..." disabled />
        ) : (
          <RenderButton text="Share" bgColor="blue" textColor="white" />
        )}
        <p
          onClick={() => setFormStage(1)}
          className="text-center font-semibold text-sm text-gray-900 cursor-pointer mt-5"
        >
          &larr; Change image
        </p>
      </Fragment>
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
      <div className="mx-auto flex flex-col md:flex-row max-w-5xl mt-8">
        <div className="md:w-3/5 mx-5 md:mx-0">
          <div className="bg-white border border-gray-400 rounded mb-6">
            <div className="p-12 mb-3">
              <h2 className="mb-6 font-semibold text-3xl">New Post</h2>
              {errors.ex && renderError()}
              <form onSubmit={handleSubmit(onSubmit)}>
                {formStage === 1 && renderStageOne()}
                {formStage === 2 && renderStageTwo()}
              </form>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 md:ml-5 md:mb-0 mx-5 mb-3">
          <Sidebar />
        </div>
      </div>
    </Fragment>
  );
};

export default reduxForm({
  form: "newPostForm",
  enableReinitialize: true,
})(PostForm);
