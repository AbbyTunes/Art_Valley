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
import ArticleDelete from "./ArticleDelete";
const { FETCH_ARTICLE } = Queries;
const { ADD_ARTICLE_LIKE, DELETE_ARTICLE } = Mutations; 

class ArticleShow extends Component {

    constructor(props) {
        super(props);
        
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

                    let deleteArticleButton;
                    deleteArticleButton = data.article.author.id === localStorage.currentUserId ? 
                    // <div>Hi delete me</div> : <div>Poo poo no delete for you :( </div>
                    <ArticleDelete article={data.article}></ArticleDelete> : <div></div>

                    let titleOption;
                    titleOption =
                      data.article.author.id === localStorage.currentUserId ? (
                        <ArticleTitleDetail
                          article={data.article}
                        ></ArticleTitleDetail>
                      ) : (
                        <div>{title}</div>
                      );
                    let headerOption;
                    headerOption =
                      data.article.author.id === localStorage.currentUserId ? (
                        <ArticleHeaderDetail
                          article={data.article}
                        ></ArticleHeaderDetail>
                      ) : (
                        <div>{header}</div>
                      );
                    let bodyOption;
                    bodyOption =
                      data.article.author.id === localStorage.currentUserId ? (
                        <ArticleBodyDetail
                          article={data.article}
                        ></ArticleBodyDetail>
                      ) : (
                        <div>{body}</div>
                      );

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
                                  {titleOption}
                              </div>
                              <div className="article-show-header">
                                {headerOption}
                              </div>
                              <div className="article-show-body">
                                {bodyOption}
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
                        {/* {deleteArticleButton} */}
                        
                      </div>
                    );
                }}
            </Query>
        )
    }
}

export default ArticleShow;