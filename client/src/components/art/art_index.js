import React from "react";
import { Query } from "react-apollo";
import "./art_index.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTS_BY_CATEGORY } = Queries;

const ArtIndex = (props) => {

	return (
		<Query 
			query={FETCH_ARTS_BY_CATEGORY} 
			variables={{ categoryId: "5dc603aa4dc3a23d54cbb4fb" }} >
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

				let sortedArtbyLike = data.artsByCategory.sort((a, b) => (a.likers.length > b.likers.length) ? -1 : 1)

				let allArtList = sortedArtbyLike.map((art) => {
					return (
						<li key={art.id} className="art-index-li">
							<Link to={`/arts/${art.id}`}>
								<img className="art-photo-thumbnail" src={art.photoLink} alt="" />
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
							Photos
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

export default withRouter(ArtIndex);