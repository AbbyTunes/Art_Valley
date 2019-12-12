import React from "react";
import { Query } from "react-apollo";
import "./video_index.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTS_BY_CATEGORY, IS_LOGGED_IN } = Queries;

const VideoIndex = (props) => {

	let createVideo = (
		<Query query={IS_LOGGED_IN} >
			{({ loading, error, data }) => {
	
				if (loading) return (
					<div >
						<p>Loading...</p>
					</div>
				);
				// if (error) return (
				// 	console.log(error)
				// );
				if ( data.isLoggedIn ) {
					return (
						<Link to="/create-video" className="article-create-link">
							Add Video
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
      variables={{ categoryId: "5dcc556324cdd659e23e1e5a" }}
      fetchPolicy={"network-only"}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="video-index-container">
              <p className="loading-text">Loading...</p>
            </div>
          );
        if (error)
          return (
            <div className="video-index-container">
              <p>Error</p>
            </div>
          );

        let sortedVideobyLike = data.artsByCategory.sort((a, b) =>
          a.likers.length > b.likers.length ? -1 : 1
        );

        let allArtList = sortedVideobyLike.map(art => {
          const linkStrArr = art.videoLink.split("/");
		  const linkId = linkStrArr[linkStrArr.length - 1];

          return (
            <li key={art.id} className="video-index-li">
              <Link to={`/videos/${art.id}`}>
                <img className="video-photo-thumbnail"
                  src={`https://img.youtube.com/vi/${linkId}/0.jpg`}
                  alt="" />
                <div className="video-photo-thumbnail-text">{art.title}</div>
              </Link>
            </li>
          );
        });

        return (
          <div className="video-index-container">
            <div className="video-header">Videos</div>

            {createVideo}

            <ul className="video-index-ul">{allArtList}</ul>
          </div>
        );
      }}
    </Query>
  );
}

export default withRouter(VideoIndex);