import React from "react";
import { Query } from "react-apollo";
import "./art_index.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTS_BY_CATEGORY } = Queries;

const VideoIndex = (props) => {

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

				let allArtList = data.artsByCategory.map((art) => {
					return (
						<li key={art.id} className="video-index-li">
							<Link to={`/videos/${art.id}`}>

								<div className="video-modal">
									<iframe width="300" height="200"
										src={art.photoLink}>
									</iframe>
								</div>	
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
					<div className="art-index-container">
						<div className="art-header">
							Videos
						</div>

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