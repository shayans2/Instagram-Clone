import React from "react";
import { history } from "../history";

const NotFound = () => {
  return (
    <div>
      <h1 className="text-5xl text-center mt-20 mb-10">Page Not Found</h1>
      <p className="text-center">
        <button
          className="text-2xl bg-gray-800 rounded py-5 px-8 text-white text-center"
          onClick={history.goBack}
        >
          Go Back
        </button>
      </p>
    </div>
  );
};

export default NotFound;
