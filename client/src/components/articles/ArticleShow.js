import React, { Component } from "react";
import { Query } from "react-apollo";
// import "./article_show.scss";
// import { withRouter } from "react-router-dom";
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
                variables={{ articleId: this.props.match.params.articleId }} >
                {({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <p>Loading...</p>
                        </div>
                    );
                    if (error) return (
                        <div>
                            <p>Error</p>
                        </div>
                    );

                    const { body, photoLink, title, likers, comments } = data.article;
                    return (
                        <div className="show-container">
                            <div className="show-art">
                                <div className="show-pic">
                                    <img className="show-image" src={photoLink}></img>
                                </div>

                                <div className="show-info">

                                    <div className="info-main">
                                        <div className="info-1">
                                            <div className="show-title">{title}</div>
                                            <div className="show-description">{description}</div>
                                        </div>

                                        <div className="info-2">
                                            <div className="show-likes">Likes {likers.length}</div>
                                        </div>
                                    </div>

                                    <div className="info-3">
                                        <div className="show-comment">Comment</div>
                                    </div>
                                </div>

                                <div className="show-artist">Add something</div>

                                <div className="show-category"></div>
                            </div>
                        </div>
                    );
                }}
            </Query>

        )
    }
}

export default ArticleShow;