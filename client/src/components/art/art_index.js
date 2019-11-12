import React from "react";
import { Query } from "react-apollo";
import "./art.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ARTS_BY_CATEGORY } = Queries;


const ArtIndex = (props) => {
	return (
		<Query 
			query={FETCH_ARTS_BY_CATEGORY} 
			variables={{ category: this.props.match.params.productId }} >
			{({ loading, error, data }) => {
				
				if (loading) return (
					<div className="art-container">
						<p>Loading...</p>
					</div>
				);
				if (error) return (
					<div className="art-container">
						<p>Error</p>
					</div>
				);

				let allArtList = data.arts.map(art => {
					return (
						<li key={art.id} className="art-index-li">
							<Link to={`/arts/${art.id}`}>
								<img className="art-photo-thumbnail" src={art.photoLink} />
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
					<div className="art-container">
						<div className="art-header">
							Art
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