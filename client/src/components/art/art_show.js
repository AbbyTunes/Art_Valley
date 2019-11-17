import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import "./art_show.scss";
import { withRouter, Link } from "react-router-dom";
import CreateComment from "../comments/CreateComment";
import ArtLike from "./art_like";
import ArtTitleDetail from "./ArtTitleDetail";
import ArtDescriptionDetail from "./ArtDescriptionDetail";
import ArtDelete from "./ArtDelete";
import Queries from "../../graphql/queries";
const { FETCH_ART } = Queries;


class ArtShow extends Component {

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

					const { id, description, photoLink, title, likers, author } = data.artById;

					let deleteArtButton; 
					deleteArtButton = author.id === localStorage.currentUserId ?
					<ArtDelete></ArtDelete> : <div></div>
					let titleOption; 
					titleOption = author.id === localStorage.currentUserId ?
					<ArtTitleDetail art={data.artById}></ArtTitleDetail> : <div>{title}</div>
					let descriptionOption; 
					descriptionOption = author.id === localStorage.currentUserId ?
					<ArtDescriptionDetail art={data.artById}></ArtDescriptionDetail> : <div>{description}</div>

					
					let showArtist;
						
						if (author.publishedArts.length !== 1 ) {
						let artPublishedLimit = author.publishedArts
							.filter(pubArt => pubArt.id !== id)
							.filter(pubArt => pubArt.photoLink.length !== 0)
							.slice(0, 3);

						let artPubList = artPublishedLimit.map(artPub => {
							return (
								<li className="home-article-example" key={artPub.id}>
									<Link to={`${artPub.id}`}>
										<img className="home-article-example-thumb" src={artPub.photoLink} />
										<div className="video-photo-thumbnail-text">{artPub.title}</div>
									</Link>
								</li>
							);
						});
						showArtist = (
							<div className="show-artist">
								<h1 className="published-header">Art by the Author</h1>
								
								<ul className="published-ul">{artPubList}</ul>
							</div>
						);
					} else {
						showArtist = (null)
					}

					return (

						<div className="show-container">
							<div className="show-art">
								<div className="show-pic">
									<img className="show-image" src={photoLink}></img>
								</div>

								<div className="show-info">

									<div className="info-main">
										<div className="info-1">
											<div className="show-title">
												{titleOption}
											</div>
											<div className="author-name">
												{author.name}
											</div>
											<div className="show-description">
												{descriptionOption}
											</div>
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
							{deleteArtButton}
						</div>
					);
				}}
			</Query>
		)
	}
}

export default withRouter(ArtShow);




