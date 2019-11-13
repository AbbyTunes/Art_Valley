import React from "react";
import { Query } from "react-apollo";
import ArticleIndexItem from "./ArticleIndexItem";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTICLES } = Queries;

const ArticleIndex = (props) => {
    return (
    <Query query={FETCH_ARTICLES}>
        {({ error, loading, data }) => {
            if (error) return (
                <div className="article-index-container"> 
                    <p>Error</p>
                </div>
            );
            if (loading) return (
                <div className="art-index-container">
                    <p>Loading...</p>
                </div>
            );
            let allArticleList = data.articles.map((article) => {
                return (
                    <li key={article.id} className="art-index-li">
                        <Link to={`/community/${article.id}`}>
                            <ArticleIndexItem article={article}></ArticleIndexItem>
                        </Link>
                    </li>
                )
            })

            let seeMoreButton = (
                <div className="see-more-button">
                    <Link to="#">See More</Link>
                </div>
            )

            return (
                <div className="article-index-container">
                    <div className="article-header">
                        Articles
					</div>
                    <div>
                        list of stuff
                        {allArticleList}
                    </div>
                    <div className="see-more-button">
                        Button
                        {seeMoreButton}
                    </div>
                </div>
            );
        }}
    </Query>
    );
}

export default ArticleIndex;