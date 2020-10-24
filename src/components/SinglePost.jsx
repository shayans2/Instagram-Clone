import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../actions";
import { getCurrentUser } from "../services/authService";
import Post from "./common/Post";
import Comments from "./common/Comments";
import Navigation from "./common/Navigation";

const SinglePost = ({ match }) => {
  const post = useSelector((state) => state.posts.singlePost[match.params.id]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) return <h1>loading...</h1>;

  const { _id, userId, location, postImage, likedBy, caption } = post;

  return (
    <Fragment>
      <Navigation /> 
      <div className="mx-auto flex flex-col md:flex-row max-w-5xl mt-8">
        <div className="md:w-3/5 mx-5 md:mx-0">
          <Post
            postId={_id}
            userId={userId}
            location={location}
            postImage={postImage}
            caption={caption}
            likedByCount={likedBy.length}
            likedByArray={likedBy}
            currentUserId={getCurrentUser()._id}
          />
        </div>
        <div className="md:w-2/5 md:ml-5 md:mb-0 mx-5 mb-3">
          <Comments postId={match.params.id} />
        </div>
      </div>
    </Fragment>
  );
};

export default SinglePost;
