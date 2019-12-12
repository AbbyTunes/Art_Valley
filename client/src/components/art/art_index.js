import React from "react";
import { Query } from "react-apollo";
import "./art_index.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";

const { FETCH_ARTS_BY_CATEGORY, IS_LOGGED_IN } = Queries;


const ArtIndex = (props) => {

		let createArt = (
					<Query query={IS_LOGGED_IN} >
						{({ loading, error, data }) => {
				
							if (loading) return (
								<div className="loading-text">
									<p>Loading...</p>
								</div>
							);
							// if (error) return (
							// 	// console.log(error)
							// );
							if ( data.isLoggedIn ) {
								return (
									<Link to="/create" className="article-create-link">
										Add Art
									</Link>
								)
							} else {
								return <div></div>
							}
						}}
				</Query>
				)

	return (
    <Query
      query={FETCH_ARTS_BY_CATEGORY}
      variables={{ categoryId: "5dc603aa4dc3a23d54cbb4fb" }}
      fetchPolicy={"network-only"}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="art-index-container">
              <p className="loading-text">Loading...</p>
            </div>
          );
        if (error)
          return (
            <div className="art-index-container">
              <p className="loading-text">Error</p>
            </div>
          );

        let sortedArtbyLike = data.artsByCategory.sort((a, b) =>
          a.likers.length > b.likers.length ? -1 : 1
        );

        let allArtList = sortedArtbyLike.map(art => {
          return (
            <li key={art.id} className="art-index-li">
              <Link to={`/arts/${art.id}`}>
                <img
                  className="art-photo-thumbnail"
                  src={art.photoLink}
                  alt=""
                />
                <div className="art-photo-thumbnail-text">{art.title}</div>
              </Link>
            </li>
          );
        });

        return (
          <div className="art-index-container">
            <div className="art-header">Photos</div>
            {createArt}
            <ul className="art-index-ul">{allArtList}</ul>
          </div>
        );
      }}
    </Query>
  );
}

export default withRouter(ArtIndex);