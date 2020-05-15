import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLike } from "../../actions";
import { Link } from "react-router-dom";

const Post = ({
  userId,
  location,
  postImage,
  postId,
  likedByCount,
  caption,
  handleLike,
  likedByArray,
  currentUserId,
}) => {
  const rednerLike = () => {
    if (likedByArray.includes(currentUserId)) {
      return (
        <i
          onClick={() => handleLike(postId, currentUserId, "unlike")}
          className="fa fa-heart cursor-pointer fa-lg text-red-600 animated heartBeat"
          aria-hidden="true"
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => handleLike(postId, currentUserId, "like")}
          className="fa fa-heart-o cursor-pointer fa-lg text-gray-900"
          aria-hidden="true"
        ></i>
      );
    }
  };
  return (
    <div className="bg-white border border-gray-400 rounded mb-6">
      <div className="pl-4 pt-3 mb-3">
        <img
          src={userId.profileImage}
          className="h-10 w-10 rounded-full float-left mr-3"
          alt={userId.username}
          aria-hidden="true"
        />

        <div>
          <span className="font-semibold text-sm">
            <Link to={`/profile/${userId._id}`}>{userId.username}</Link>
            <span className="font-normal text-xs leading-tight">
              <br />
              {location}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-2">
        <img
          src={postImage}
          alt={`${userId.username}'s post image`}
          aria-hidden="true"
        />
      </div>

      <section className="px-3 my-3 mt-5">
        <span>
          {rednerLike()}
          <Link to={`/posts/${postId}`}>
            <i
              className="fa fa-comment-o fa-lg ml-3  cursor-pointer"
              aria-hidden="true"
            ></i>
          </Link>
        </span>
        <span className="float-right">
          <i className="fa fa-share fa-lg" aria-hidden="true"></i>
        </span>
      </section>
      <div className="pt-1 pb-2 px-3">
        <div className="text-sm">
          Liked by
          <span className="font-semibold">{` ${likedByCount}`} people</span>
        </div>
        <span className="font-semibold text-sm">{userId.username}</span>
        <span className="text-sm">{` ${caption}`}</span>
      </div>
    </div>
  );
};

export default connect(null, {
  handleLike,
})(Post);
