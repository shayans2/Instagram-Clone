import React, { Fragment } from "react";
import { getCurrentUser } from "../../services/authService";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { _id, fullname, username, profileImage } = getCurrentUser();
  return (
    <Fragment>
      <div className="pl-4 mb-8">
        <img
          src={profileImage}
          className="h-12 rounded-full float-left mr-3"
          alt={username}
          aria-hidden="true"
        />
        <Link to={`/profile/${_id}`}>
          <div>
            <span className="font-semibold text-sm">
              {username}
              <span className="font-normal text-xs leading-tight text-gray-600">
                <br />
                {fullname}
              </span>
            </span>
          </div>
        </Link>
      </div>
      <div className="bg-white border border-b rounded px-5 py-3">
        <span className="font-semibold text-gray-600 text-sm">
          Suggestions for you
        </span>
        <div className="pl-2 pt-3 mb-3">Coming Soon</div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
