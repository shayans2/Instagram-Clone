import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfilePosts, fetchUser, handleFollow } from "../actions";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Navigation from "./common/Navigation";

const Profile = ({ match }) => {
  const profilePosts = useSelector((state) =>
    Object.values(state.posts.profilePosts)
  );
  const userDetails = useSelector((state) => state.users.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfilePosts(match.params.id));
    dispatch(fetchUser(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPosts = () => {
    return profilePosts.map((post) => (
      <div className="w-1/3 px-2 mb-4" key={post._id}>
        <Link to={`/posts/${post._id}`}>
          <img src={post.postImage} alt={post.postCaption} />
        </Link>
      </div>
    ));
  };

  const renderFollow = () => {
    if (userDetails.followers.includes(getCurrentUser()._id)) {
      return (
        <button
          onClick={() =>
            dispatch(
              handleFollow(getCurrentUser()._id, userDetails._id, "unfollow")
            )
          }
          className="bg-transparent text-gray-800 font-semibold  py-2 px-4 border border-gray-500 hover:border-gray-800 rounded"
        >
          <i className="fa fa-check" aria-hidden="true"></i> Following
        </button>
      );
    } else {
      return (
        <button
          onClick={() =>
            dispatch(
              handleFollow(getCurrentUser()._id, userDetails._id, "follow")
            )
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Follow
        </button>
      );
    }
  };

  if (!userDetails) return <h1>Loading...</h1>;

  const {
    profileImage,
    username,
    followers,
    following,
    fullname,
    biography,
    website,
  } = userDetails;
  return (
    <Fragment>
      <Navigation />
      <div className="mx-auto max-w-4xl">
        <div className="mt-6 mb-4">
          <div className="pl-4 pt-3 mb-8">
            <img
              src={profileImage}
              className="h-40 rounded-full float-left mr-24"
              alt="Profile picture"
              aria-hidden="true"
            />

            <div>
              <span className="font-light text-3xl text-gray-900">
                {username}
              </span>
              <span className="float-right mr-20">
                {match.params.id !== getCurrentUser()._id ? renderFollow() : ""}
              </span>
            </div>
            <div className="mt-4">
              <ul>
                <li className="inline mr-10 text-gray-900">
                  <span className="font-semibold">{profilePosts.length}</span>{" "}
                  posts
                </li>
                <li className="inline mr-10 text-gray-900">
                  <span className="font-semibold">{followers.length}</span>{" "}
                  followers
                </li>
                <li className="inline text-gray-900">
                  <span className="font-semibold">{following.length}</span>{" "}
                  following
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <span className="text-gray-900 font-semibold">{fullname}</span>
              <br />
              <span>{biography}</span>
              <br />
              <span className="text-blue-800 mt-5 font-semibold">
                {website}
              </span>
            </div>
          </div>
          <hr />
        </div>

        <div className="px-2">
          <div className="flex flex-wrap -mb-4 -mx-2">{renderPosts()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
