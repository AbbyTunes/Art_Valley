import React from "react";
import "./comment.css";

const CommentDetail = props => {
  return (
    <div className="comment-container">
      <div className="comment-icon-container">
        <div className="comment-author-icon">
          <span
            role="img"
            alt=""
            aria-label="debug"
            className="comment-author-icon-pic"
          >
            {props.comment.author.name.slice(0, 1)}
          </span>
        </div>
      </div>

      <div className="comment-body-container">
        <div className="comment-author">{props.comment.author.name}</div>
        <div className="comment-body">{props.comment.body}</div>
      </div>
    </div>
  );
};

export default CommentDetail;

