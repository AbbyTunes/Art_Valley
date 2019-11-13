

import React, { Component } from "react";
import { Query } from "react-apollo";
import "./art_show.scss";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ART } = Queries;

class VideoShow extends Component {

	render() {
		return (
			<Query
				query={FETCH_ART}
				variables={{ artId: this.props.match.params.artId }} >
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

					console.dir(data)
					const { description, photoLink, title, likers } = data.artById;
					return (
						<div className="show-container">
							<div className="show-art">
								<div className="show-pic">
									
									<iframe width="420" height="315"
										src={photoLink}>
									</iframe>
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

export default withRouter(VideoShow);