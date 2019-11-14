import React, { Component } from "react";
import { Query } from "react-apollo";
import "./article_show.css";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTICLE } = Queries;

class ArticleShow extends Component {

    constructor(props) {
        super(props)
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

                    // let photo = data.article.photoLink ? 
                    //     <div className="article-show-photo">
                    //         <img className="article-show-image" src={photoLink}></img>
                    //     </div> : 
                    //     <div></div>

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
                                    <div className="article-show-title">{title}</div>
                                    <div className="article-show-header">
                                        {header}
                                    </div>
                                    <div className="article-show-body">{body}</div>
                                </div>
                                <div className="article-info-2">
                                    <div className="article-show-likes">
                                        Likes {likers.length}
                                    </div>
                                </div>
                            </div>

                          {/* <div className="article-info-3">
                                        <div className="article-show-comment">Comment</div>
                                </div> */}
                        </div>

                        <div>
                            <Link to="/community" className="back-to-community">
                                Back to Community
                            </Link>
                        </div>
                    </div>
                    );
                }}
            </Query>

        )
    }
}

export default ArticleShow;