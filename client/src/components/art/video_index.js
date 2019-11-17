import React from "react";
import { Query } from "react-apollo";
import "./art_index.css"
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
							if (error) return (
								console.log(error)
							);
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
			variables={{ categoryId: "5dcc556324cdd659e23e1e5a" }} >
			{({ loading, error, data }) => {

				if (loading) return (
					<div className="art-index-container">
						<p>Loading...</p>
					</div>
				);
				if (error) return (
					<div className="art-index-container">
						<p>Error</p>
					</div>
				);

				let sortedVideobyLike = data.artsByCategory.sort((a, b) => (a.likers.length > b.likers.length) ? -1 : 1)

				let allArtList = sortedVideobyLike.map((art) => {
					return (
						<li key={art.id} className="video-index-li">
							
							<Link to={`/videos/${art.id}`}>
								<div className="video-modal"></div>
							</Link>	

							<iframe width="300" height="200"
								src={art.videoLink}>
							</iframe>
							
						</li>
					)
				})

				let seeMoreButton = (
					<div className="see-more-button">
						<Link to="#">See More</Link>
					</div>
				)

				return (
					<div className="art-index-container">
						<div className="art-header">
							Videos
						</div>

						{createVideo}

						<ul className="art-index-ul">
							{allArtList}
						</ul>

						<div className="see-more-button">
							{seeMoreButton}
						</div>

					</div>
				);
			}}
		</Query>
	);
}

export default withRouter(VideoIndex);