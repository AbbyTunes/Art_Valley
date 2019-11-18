import React from "react";
import "./article-index-item.css";
import { Link } from "react-router-dom";

const ArticleIndexItem = (props) => {
    return (
      <div className="article-index-item-container">
        <div className="article-index-item-thumbnail-container">
          <img
            src={props.article.photoLink}
            className="article-index-item-thumbnail"
          />
        </div>
        <div className="article-index-item-author">
          <Link to={`/users/${props.article.author.id}`}>{props.article.author.name}</Link>
        </div>
        <div className="article-index-item-title">{props.article.title}</div>
        <div className="article-index-item-header">{props.article.header}</div>
        <div className="article-index-item-sub">
          <div>{props.article.likers.length} likes</div>
          <div>{props.article.comments.length} comments</div>
        </div>
      </div>
    );
}

export default ArticleIndexItem;