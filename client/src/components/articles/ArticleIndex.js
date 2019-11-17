import React from "react";
import { Query } from "react-apollo";
import ArticleIndexItem from "./ArticleIndexItem";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import "./article_index.css"
const { FETCH_ARTICLES } = Queries;

class ArticleIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render () {
                return (
                  <Query query={FETCH_ARTICLES} fetchPolicy={'network-only'}>
                    {({ error, loading, data }) => {
                      if (error)
                        return (
                          <div className="article-index-container">
                            <p>Error</p>
                          </div>
                        );
                      if (loading)
                        return (
                          <div className="art-index-container">
                            <p>Loading...</p>
                          </div>
                        );

                      let allArticleList = data.articles.map(article => {
                        return (
                          <li key={article.id} className="article-index-li">
                            <Link to={`/community/${article.id}`}>
                              <ArticleIndexItem
                                article={article}
                              ></ArticleIndexItem>
                            </Link>
                          </li>
                        );
                      });

                      return (
                        <div className="article-index-container">
                          <h1 className="article-index-header">Trending</h1>
                          <Link
                            to="/community/create"
                            className="article-create-link"
                          >
                            Add Thoughts
                          </Link>
                          <div className="article-index-list">
                            {allArticleList}
                          </div>
                        </div>
                      );
                    }}
                  </Query>
                );
              }
}

export default ArticleIndex;