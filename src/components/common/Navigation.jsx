import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="h-16 bg-white border border-b mx-auto items-center justify-center text-center flex flex-wrap">
      <div className="w-1/3">
        <h1 className="text-center text-2xl text-gray-900">
          <Link to="/dashboard">Instagram Clone</Link>
        </h1>
      </div>
      <div className="w-1/3">
        <input
          className="appearance-none border rounded-sm w-1/2 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-gray-600 border-gray-400 text-xs bg-gray-100"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="w-1/3">
        <Link to="/settings">
          <i
            className="fa fa-cogs fa-lg text-gray-900  mr-5"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/post/new">
          <i
            className="fa fa-plus-square-o fa-lg text-gray-900 mr-5"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/login">
          <i
            className="fa fa-sign-out fa-lg text-gray-900 mr-5"
            aria-hidden="true"
          ></i>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
