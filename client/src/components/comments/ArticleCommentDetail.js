import React from "react";
import "./comment.css";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { merge } from 'lodash'
const { DELETE_COMMENT } = Mutations;
const { FETCH_ARTICLE } = Queries;

class ArticleCommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            author: ""
        };
    }

    updateCache(cache, data) {

        const article = cache.readQuery({
            query: FETCH_ARTICLE,
            variables: {
                _id: this.props.articleId

            }
        });
        let newArticle = merge({}, article);
        newArticle.article.comments = newArticle.article.comments.filter((comment) => {
            return comment.id !== data.data.deleteComment.id
        })

        // console.log(newArticle);
        cache.writeQuery({
            query: FETCH_ARTICLE, data: newArticle,
            variables: {
                _id: this.props.articleId
            }
        })

    }


    deleteComment() {
        if (localStorage.currentUserId === this.props.comment.author.id) {
            return (
                <Mutation
                    mutation={DELETE_COMMENT}
                    update={(cache, data) => this.updateCache(cache, data)}
                >
                    {(deleteComment) => (
                        <a
                            className="comment-body-delete"
                            onClick={e => {
                                e.preventDefault();
                                deleteComment({ variables: { id: this.props.comment.id } });
                            }}
                        >
                            Delete
                        </a>
                    )}

                </Mutation >
            )
        }
    }

    render() {

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
                            {this.props.comment.author.name.slice(0, 1)}
                        </span>
                    </div>
                </div>
                <div className="comment-body-container">
                    <div className="comment-author">{this.props.comment.author.name}</div>

                    <div className="comment-body">{this.props.comment.body}</div>
                    {this.deleteComment()}
                </div>
            </div>
        );
    }


}

export default ArticleCommentDetail;

