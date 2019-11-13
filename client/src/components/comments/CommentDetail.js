import React from "react";
import "./comment.css";

const CommentDetail = props => {
  return (
    <div className="comment-container">
      <div className="comment-author">{props.comment.author.name}</div>
      <div className="comment-body">{props.comment.body}</div>
    </div>
  );
};

export default CommentDetail;

