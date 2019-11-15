import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import "./article_show.css";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import ArticleLike from "./ArticleLike";
import ArticleComments from "../comments/ArticleComments";
import ArticleTitleDetail from "./ArticleTitleDetail.js";
import ArticleBodyDetail from "./ArticleBodyDetail";
import ArticleHeaderDetail from "./ArticleHeaderDetail";
const { FETCH_ARTICLE } = Queries;
const { ADD_ARTICLE_LIKE, DELETE_ARTICLE } = Mutations;

class ArticleShow extends Component {

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete(deleteArticle) {
    //   if (localStorage.currentUserId === this.props.article.author.id) {
    //     return (
      deleteArticle({ variables: { _id: this.props.match.params.articleId } })
        .then(this.props.history.push("/community"))
    //     )
    //   }
    }

    render() {
        
        return (
            <Query
                query={FETCH_ARTICLE}
                variables={{ _id: this.props.match.params.articleId }} >
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div className="temp">
                            <p>Loading...</p>
                        </div>
                    );
                    if (error) return (
                        <div className="temp">
                            <p>Error</p>
                        </div>
                    );

                    const { body, photoLink, title, likers, comments, header } = data.article;

                    return (
                      <div className="article-show-container">
                        <div className="article-show-photo-container">
                          <div className="article-show-photo">
                            <img
                              className="article-show-image"
                              src={photoLink}
                            ></img>
                          </div>
                        </div>

                        <div className="article-show-info">
                          <div className="article-info-main">
                            <div className="article-info-1">
                              <div className="article-show-title">
                                <div>
                                  <ArticleTitleDetail
                                    article={data.article}
                                  ></ArticleTitleDetail>
                                </div>
                              </div>
                              <div className="article-show-header">
                                <ArticleHeaderDetail
                                  article={data.article}
                                ></ArticleHeaderDetail>
                              </div>
                              <div className="article-show-body">
                                <ArticleBodyDetail
                                  article={data.article}
                                ></ArticleBodyDetail>
                              </div>
                            </div>
                            <div className="article-info-2">
                              <ArticleLike likers={likers} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Link to="/community" className="back-to-community">
                            Back to Community
                          </Link>
                        </div>
                        <div>
                          <ArticleComments
                            articleId={this.props.match.params.articleId}
                            commentData={data.article.comments}
                          />
                        </div>
                        <Mutation
                          mutation={DELETE_ARTICLE}
                          // update={(cache, data) => this.updateCache(cache, data)}
                        >
                          {deleteArticle => (
                            <a
                              className="comment-body-delete"
                              onClick={e => {
                                this.delete(deleteArticle);
                                // e.preventDefault();
                                // deleteArticle({ variables: { _id: this.props.match.params.articleId } });
                              }}
                            >
                              Delete
                            </a>
                          )}
                        </Mutation>
                      </div>
                    );
                }}
            </Query>

        )
    }
}

export default ArticleShow;