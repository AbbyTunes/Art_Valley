import React, { Component } from "react";
import { Query } from "react-apollo";
import "./art_show.scss";
import { withRouter, Link } from "react-router-dom";
import ArtLike from "./art_like";
import Queries from "../../graphql/queries";
import CreateComment from "../comments/CreateComment";

const { FETCH_ART } = Queries;

class VideoShow extends Component {

	render() {
		return (
			<Query
				query={FETCH_ART}
				variables={{ artId: this.props.match.params.artId }} >
				{({ loading, error, data }) => {
					if (loading) return (
						<div className="temp">
							<p>Loading...</p>
						</div>
					);
					if (error) return (
						<div className="temp">
							<p>Error</p>
						</div>
					);

					const { id, description, videoLink, title, likers, author } = data.artById;
					let showArtist;
				
					if (author.publishedArts.length !== 1 ) {
						const artPublishedLimit = author.publishedArts.filter(pubArt => pubArt.id !== id)
							.filter(pubArt => pubArt.videoLink)
							.slice(0, 3);
				
						let allVideoList = artPublishedLimit.map((video) => {
					
							const linkStrArr = video.videoLink.split("/")
							const linkId = linkStrArr[linkStrArr.length - 1]

							return (
								<li key={video.id} className="home-article-example" >
									
									<Link to={`/videos/${video.id}`}>
										<img className="home-article-example-thumb"
												src={`https://img.youtube.com/vi/${linkId}/0.jpg`}
												alt="" 
										/>
										<div className="video-photo-thumbnail-text">{video.title}</div>
									</Link>	
								</li>
							)
						})

						showArtist = (
							<div className="show-artist">
								<h1 className="published-header">More videos by {author.name}</h1>
								<ul className="published-ul">{allVideoList}</ul>
							</div>
						);
					} else {
						showArtist = (null)
					}

					return (
						<div className="show-container">
							<div className="show-art">
								<div className="show-pic">

									<iframe width="700" height="450"
										src={videoLink}>
									</iframe>
									

								</div>

								<div className="show-info">

									<div className="info-main">
										<div className="info-1">
											<div className="show-title">{title}</div>
											<div className="show-description">{description}</div>
										</div>

										<div className="info-2">
											<ArtLike likers={likers} />
										</div>
									</div>

									<div className="info-3">
										<div className="show-comment">
											<CreateComment artId={data.artById.id} comments={data.artById.comments} />
										</div>
									</div>
									{showArtist}

								</div>

								

							</div>
						</div>
					);
				}}
			</Query>

		)
	}
}

export default withRouter(VideoShow);