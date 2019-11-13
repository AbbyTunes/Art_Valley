import React from "react";

const ArticleIndexItem = (props) => {
    return (
        <div>
            {props.article.title}
            {props.article.body}
            {props.article.author}
        </div>
    )
}

export default ArticleIndexItem;