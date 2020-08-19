import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { fetchTimeline } from "../actions";
import { getCurrentUser } from "../services/authService";
import Post from "./common/Post";
import Navigation from "./common/Navigation";
import Sidebar from "./common/Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const posts = useSelector((state) => Object.values(state.posts.timeline));
  const postsCount = useSelector((state) => state.posts.timelinePostsCount);
  const pageSize = useSelector((state) => state.posts.pageSize);
  const [currentPage, setPage] = useState(
    useSelector((state) => state.posts.currentPage)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTimeline(getCurrentUser()._id, currentPage, pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <div>
          <img
            src="http://localhost:4000/uploads/empty-timeline.jpg"
            alt="No posts"
            aria-hidden="true"
          />
          <h2 className="text-4xl text-center text-gray-700 mt-5">
            Follow people to see their posts
          </h2>
        </div>
      );
    } else {
      return posts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          userId={post.userId}
          location={post.location}
          postImage={post.postImage}
          caption={post.caption}
          likedByCount={post.likedBy.length}
          likedByArray={post.likedBy}
          currentUserId={getCurrentUser()._id}
        />
      ));
    }
  };

  const renderPagination = () => {
    const pagesCount = Math.ceil(postsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
      <ul className="flex mb-10">
        {pages.map((page) => (
          <li className="mr-3" key={page}>
            <p
              className={
                page === currentPage
                  ? "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
                  : "inline-block border border-gray rounded hover:border-gray-400 text-blue-500 bg-gray-200 py-1 px-3 cursor-pointer"
              }
              onClick={() => setPage(page)}
            >
              {page}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Fragment>
      <Navigation />
      <div className="mx-auto flex max-w-5xl mt-8">
        <div className="w-3/5">
          {renderPosts()}
          {renderPagination()}
        </div>
        <div className="w-2/5 ml-5">
          <Sidebar />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
