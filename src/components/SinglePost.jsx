import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchPost, fetchComments } from "../actions";
import { getCurrentUser } from "../services/authService";
import Post from "./common/Post";
import Comments from "./common/Comments";
import Navigation from "./common/Navigation";

class SinglePost extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }
  render() {
    if (!this.props.post) {
      return <div>loading...</div>;
    } else {
      const {
        _id,
        userId,
        location,
        postImage,
        likedBy,
        caption,
      } = this.props.post;
      return (
        <Fragment>
          <Navigation />

          <div className="mx-auto flex max-w-5xl mt-8">
            <div className="w-3/5">
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
            <div className="w-2/5 ml-5">
              <Comments postId={this.props.match.params.id} />
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.singlePost[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchPost, fetchComments })(
  SinglePost
);
